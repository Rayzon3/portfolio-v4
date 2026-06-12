export type BlogSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  codeBlocks?: Array<{
    language: string;
    code: string;
  }>;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  summary: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-distributed-systems-need-consensus",
    title: "Why Distributed Systems Need Consensus",
    description:
      "A practical explanation of why distributed systems need consensus and how the Raft Consensus Algorithm solves leader election, log replication, and consistency problems.",
    date: "Jun 2026",
    publishedAt: "2026-06-12T09:00:00+05:30",
    readTime: "10 min read",
    tags: ["Distributed Systems", "Raft", "Backend"],
    summary:
      "Why clusters need agreement, what actually goes wrong when machines fail, and how Raft keeps state consistent through leader election and log replication.",
    sections: [
      {
        heading: "Introduction",
        paragraphs: [
          "Modern applications rarely run on a single machine anymore. Kubernetes clusters, distributed databases, payment platforms, and realtime systems all depend on multiple servers working together.",
          "The hard part is not simply storing data on many machines. The hard part is making those machines agree on the same truth.",
          "Consensus algorithms exist to solve that problem, and Raft is one of the most practical ways to understand it.",
        ],
      },
      {
        heading: "The real problem begins when machines fail",
        paragraphs: [
          "In local development, a request feels straightforward. You send a write, the server processes it, and you move on.",
          "Production systems are different. Multiple nodes receive traffic, replicate state, and exchange messages over unreliable networks. Failures are normal, not exceptional.",
          "Now you have a real question: was the payment successful, should it be retried, and which node should the rest of the system trust?",
        ],
        codeBlocks: [
          {
            language: "txt",
            code: "POST /payment",
          },
          {
            language: "txt",
            code: "Server A\nServer B\nServer C\n\nServer A -> Payment Processed\nServer B -> No Record Found\nServer C -> No Record Found",
          },
        ],
      },
      {
        heading: "Real-world example: bike rental platform",
        paragraphs: [
          "Imagine a bike rental platform where Bike #42 is available. A booking request reaches Server A, which marks the bike as reserved.",
          "Before that update reaches the rest of the cluster, Server A loses connectivity. Another booking request reaches Server B, which still believes the bike is available.",
          "At that point, two users may have booked the same bike. The same category of failure appears in payment systems, inventory, order management, and scheduling platforms.",
        ],
        codeBlocks: [
          {
            language: "txt",
            code: "Bike #42 -> Available\n\nServer A processes booking\n\nNetwork partition happens\n\nServer B still sees:\nBike #42 -> Available",
          },
        ],
        bullets: [
          "Duplicate payments",
          "Conflicting orders",
          "Inconsistent inventory",
          "Corrupted cluster state",
          "Split-brain behavior",
        ],
      },
      {
        heading: "What is consensus?",
        paragraphs: [
          "Consensus means multiple nodes agreeing on the same ordered sequence of operations, even when machines fail, messages arrive late, or leaders crash.",
          "The cluster has to agree on what happened, in what order it happened, and whether that operation is considered committed.",
        ],
      },
      {
        heading: "Enter Raft",
        paragraphs: [
          "Raft is a distributed consensus algorithm designed to make this agreement problem easier to reason about. It was explicitly designed to be more understandable than Paxos while preserving the same core guarantees.",
          "Raft is widely used in real systems, so learning it gives you a practical mental model for how production clusters coordinate writes.",
        ],
      },
      {
        heading: "Leader election",
        paragraphs: [
          "Raft uses a leader-based model. At any point, one node acts as the leader and the rest are followers.",
          "Clients send write requests to the leader. Followers expect heartbeats from that leader. If those heartbeats stop, followers assume the leader failed and an election begins.",
          "This is why Raft clusters are intentionally built around majority decisions. Without that majority, no node is allowed to safely act as the source of truth.",
        ],
        codeBlocks: [
          {
            language: "txt",
            code: "Follower timeout\n-> becomes Candidate\n-> requests votes\n-> majority wins\n-> becomes Leader",
          },
        ],
      },
      {
        heading: "Log replication",
        paragraphs: [
          "Once a leader is elected, every write first goes into the leader's log. That log is then replicated to followers.",
          "A write is only considered committed when a majority of nodes have acknowledged it. This prevents the system from treating a leader-local write as durable if the leader crashes before the rest of the cluster learns about it.",
        ],
        codeBlocks: [
          {
            language: "txt",
            code: "Client -> Leader\nLeader appends entry to local log\nLeader sends entry to Followers\nMajority acknowledges\nEntry becomes committed",
          },
        ],
      },
      {
        heading: "Why majority matters",
        paragraphs: [
          "Majority agreement is what protects the cluster from accidental divergence. If a write exists on most nodes, a future leader is guaranteed to see that history.",
          "That means the cluster can keep progressing without trusting any single machine to always stay alive or reachable.",
        ],
        codeBlocks: [
          {
            language: "txt",
            code: "3-node cluster\nCommit requires 2 nodes\n\n5-node cluster\nCommit requires 3 nodes",
          },
        ],
      },
      {
        heading: "What happens if the leader crashes?",
        paragraphs: [
          "If the leader crashes after a write is committed, a new election happens and a follower with the most up-to-date log can become leader.",
          "If the leader crashes before the write reached a majority, that write is not committed and may be discarded. This is a feature, not a bug. Raft prefers consistency over pretending an unsafe write succeeded.",
        ],
      },
      {
        heading: "Split brain",
        paragraphs: [
          "Split brain is the nightmare scenario where two sides of a partition both believe they should accept writes. That leads directly to conflicting realities.",
          "Raft avoids this by requiring a majority for leadership. A partitioned minority cannot elect a valid leader, so it must stop accepting writes.",
        ],
        codeBlocks: [
          {
            language: "txt",
            code: "Cluster: A B C D E\nPartition: A B | C D E\n\nA B cannot lead without 3 votes\nC D E can elect a leader and continue safely",
          },
        ],
      },
      {
        heading: "Real systems using Raft",
        paragraphs: [
          "Raft is not academic trivia. It underpins real infrastructure used every day.",
        ],
        bullets: [
          "etcd in Kubernetes control planes",
          "Kafka KRaft metadata management",
          "RabbitMQ quorum queues",
          "Consul service coordination",
          "CockroachDB cluster coordination",
        ],
      },
      {
        heading: "Tradeoffs",
        paragraphs: [
          "Raft is practical, but it is not free. Consensus adds latency, because writes need coordination and acknowledgements from a majority.",
          "It also reduces write availability during partitions. If the cluster cannot form a majority, it has to stop taking writes rather than risk inconsistency.",
          "That tradeoff is exactly why consensus should only be used where the state truly requires strong coordination.",
        ],
      },
      {
        heading: "Final thoughts",
        paragraphs: [
          "Distributed systems do not become difficult because they run on many machines. They become difficult because failure is constant and every failure creates ambiguity.",
          "Consensus algorithms remove that ambiguity by forcing the cluster to agree on one ordered history. Raft does that through leader election, log replication, and majority-based commitment.",
          "If you work on backend systems, queues, schedulers, payment flows, or Kubernetes-based platforms, understanding Raft gives you a much better model for what your infrastructure is doing underneath the surface.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
