<script lang="ts">
  import { onMount } from "svelte";

  type DiagramVariant =
    | "failure"
    | "leader-election"
    | "log-replication"
    | "majority"
    | "split-brain";

  const diagramCopy: Record<
    DiagramVariant,
    { title: string; caption: string; label: string }
  > = {
    failure: {
      title: "Failure creates conflicting truth",
      caption:
        "A node can accept a write while the rest of the cluster has not learned about it yet.",
      label: "Distributed failure diagram",
    },
    "leader-election": {
      title: "Leader election",
      caption:
        "A timed-out follower becomes a candidate and needs a majority before it can lead.",
      label: "Raft leader election diagram",
    },
    "log-replication": {
      title: "Log replication",
      caption:
        "The leader appends the client command, replicates it, then commits after majority acknowledgement.",
      label: "Raft log replication diagram",
    },
    majority: {
      title: "Majority quorum",
      caption:
        "A committed value survives future elections because any future majority overlaps with the old one.",
      label: "Raft majority quorum diagram",
    },
    "split-brain": {
      title: "Split brain prevention",
      caption:
        "A minority partition cannot form quorum, so it cannot safely accept writes.",
      label: "Raft split brain prevention diagram",
    },
  };

  let { variant }: { variant: DiagramVariant } = $props();
  let diagramHost: HTMLDivElement;

  onMount(async () => {
    const { dia, shapes } = await import("@joint/core");

    const makePaper = (el: HTMLDivElement, width: number, height: number) => {
      const graph = new dia.Graph();
      const paper = new dia.Paper({
        el,
        model: graph,
        width,
        height,
        gridSize: 1,
        interactive: false,
        async: true,
        background: { color: "transparent" },
      });

      return { graph, paper };
    };

    const IsoNode = dia.Element.define(
      "portfolio.IsoNode",
      {
        size: { width: 156, height: 112 },
        attrs: {
          shadow: {
            d: "M 18 82 L 78 108 L 142 82 L 82 58 Z",
            fill: "rgba(0, 0, 0, 0.22)",
            stroke: "none",
          },
          leftFace: {
            d: "M 20 34 L 78 62 L 78 104 L 20 76 Z",
            fill: "#17141f",
            stroke: "#73c7c7",
            strokeWidth: 1.2,
          },
          rightFace: {
            d: "M 78 62 L 136 34 L 136 76 L 78 104 Z",
            fill: "#11101a",
            stroke: "#73c7c7",
            strokeWidth: 1.2,
          },
          topFace: {
            d: "M 20 34 L 78 6 L 136 34 L 78 62 Z",
            fill: "#211d2b",
            stroke: "#73c7c7",
            strokeWidth: 1.6,
          },
          label: {
            text: "",
            x: 78,
            y: 46,
            textAnchor: "middle",
            textVerticalAnchor: "middle",
            fill: "#f4f1f4",
            fontFamily: "Instrument Sans, system-ui, sans-serif",
            fontSize: 12,
            lineHeight: 16,
          },
          role: {
            text: "",
            x: 78,
            y: 76,
            textAnchor: "middle",
            textVerticalAnchor: "middle",
            fill: "#b7b1bb",
            fontFamily: "Instrument Sans, system-ui, sans-serif",
            fontSize: 10,
            letterSpacing: 0,
          },
        },
      },
      {
        markup: [
          { tagName: "path", selector: "shadow" },
          { tagName: "path", selector: "leftFace" },
          { tagName: "path", selector: "rightFace" },
          { tagName: "path", selector: "topFace" },
          { tagName: "text", selector: "label" },
          { tagName: "text", selector: "role" },
        ],
      },
    );

    const makeNode = (
      x: number,
      y: number,
      label: string,
      role: string,
      color: string,
    ) => {
      const node = new IsoNode();
      node.position(x, y);
      node.attr({
        topFace: {
          fill: color === "#e99fc7" ? "#2a1d2a" : "#1d2b2c",
          stroke: color,
        },
        leftFace: {
          fill: color === "#e99fc7" ? "#1e1722" : "#152225",
          stroke: color,
        },
        rightFace: {
          fill: color === "#e99fc7" ? "#15111b" : "#101a1d",
          stroke: color,
        },
        label: {
          text: label,
        },
        role: {
          text: role,
          fill: color,
        },
      });

      return node;
    };

    const makeLink = (
      source: { id: string | number },
      target: { id: string | number },
      label = "",
      color = "#73c7c7",
      vertices: Array<{ x: number; y: number }> = [],
    ) => {
      const link = new shapes.standard.Link({
        source: { id: source.id },
        target: { id: target.id },
        vertices,
      });

      link.attr({
        line: {
          stroke: color,
          strokeWidth: 1.5,
          strokeOpacity: 0.82,
          targetMarker: {
            type: "path",
            d: "M 8 -4 0 0 8 4 z",
            fill: color,
          },
        },
      });

      link.router("normal");
      link.connector("rounded", { radius: 16 });

      if (label) {
        link.labels([
          {
            position: 0.5,
            attrs: {
              text: {
                text: label,
                fill: "#b7b1bb",
                fontFamily: "Instrument Sans, system-ui, sans-serif",
                fontSize: 10,
              },
              rect: {
                fill: "#0f0e13",
                stroke: "rgba(145, 136, 149, 0.24)",
                rx: 8,
                ry: 8,
              },
            },
          },
        ]);
      }

      return link;
    };

    const fit = (paper: { scaleContentToFit: (options: object) => void }) => {
      paper.scaleContentToFit({ padding: 16, preserveAspectRatio: true });
    };

    const drawFailure = () => {
      const { graph, paper } = makePaper(diagramHost, 760, 330);
      const client = makeNode(36, 46, "Client", "booking", "#f0cf85");
      const serverA = makeNode(288, 42, "Server A", "reserved", "#e99fc7");
      const serverB = makeNode(548, 42, "Server B", "available", "#73c7c7");
      const serverC = makeNode(548, 206, "Server C", "available", "#73c7c7");
      const partition = makeNode(288, 210, "Partition", "state unknown", "#b8a6ff");

      graph.addCells([
        client,
        serverA,
        serverB,
        serverC,
        partition,
        makeLink(client, serverA, "write", "#f0cf85", [{ x: 210, y: 92 }]),
        makeLink(serverA, partition, "lost link", "#b8a6ff", [
          { x: 360, y: 184 },
        ]),
        makeLink(serverA, serverB, "", "#e99fc7", [{ x: 490, y: 100 }]),
        makeLink(partition, serverC, "", "#b8a6ff", [
          { x: 438, y: 274 },
          { x: 520, y: 274 },
        ]),
      ]);

      fit(paper);
    };

    const drawElection = () => {
      const { graph, paper } = makePaper(diagramHost, 760, 320);
      const candidate = makeNode(60, 106, "Node B", "Candidate", "#e99fc7");
      const followerA = makeNode(318, 28, "Node A", "Follower", "#73c7c7");
      const followerC = makeNode(560, 106, "Node C", "Follower", "#73c7c7");
      const majority = makeNode(318, 212, "Majority", "2 of 3 votes", "#f0cf85");

      graph.addCells([
        candidate,
        followerA,
        followerC,
        majority,
        makeLink(candidate, followerA, "RequestVote", "#e99fc7", [{ x: 225, y: 86 }]),
        makeLink(candidate, followerC, "", "#e99fc7", [
          { x: 300, y: 166 },
          { x: 500, y: 166 },
        ]),
        makeLink(followerA, majority, "votes", "#73c7c7", [
          { x: 396, y: 154 },
        ]),
        makeLink(followerC, majority, "", "#73c7c7", [
          { x: 540, y: 266 },
          { x: 478, y: 266 },
        ]),
      ]);

      fit(paper);
    };

    const drawReplication = () => {
      const { graph, paper } = makePaper(diagramHost, 760, 360);
      const client = makeNode(34, 38, "Client", "write request", "#f0cf85");
      const leader = makeNode(296, 124, "Leader", "append log", "#e99fc7");
      const followerA = makeNode(560, 38, "Follower A", "replicate", "#73c7c7");
      const followerB = makeNode(560, 222, "Follower B", "replicate", "#73c7c7");
      const commit = makeNode(296, 254, "Commit", "majority ack", "#b8a6ff");

      graph.addCells([
        client,
        leader,
        followerA,
        followerB,
        commit,
        makeLink(client, leader, "command", "#f0cf85", [
          { x: 210, y: 98 },
        ]),
        makeLink(leader, followerA, "AppendEntries", "#73c7c7", [
          { x: 470, y: 102 },
        ]),
        makeLink(leader, followerB, "", "#73c7c7", [
          { x: 486, y: 230 },
        ]),
        makeLink(followerA, commit, "acks", "#b8a6ff", [
          { x: 638, y: 188 },
          { x: 476, y: 306 },
        ]),
        makeLink(followerB, commit, "", "#b8a6ff", [
          { x: 520, y: 322 },
        ]),
      ]);

      fit(paper);
    };

    const drawMajority = () => {
      const { graph, paper } = makePaper(diagramHost, 760, 320);
      const oldLeader = makeNode(48, 106, "Old leader", "committed", "#e99fc7");
      const nodeA = makeNode(294, 30, "Node A", "has entry", "#73c7c7");
      const nodeB = makeNode(294, 190, "Node B", "has entry", "#73c7c7");
      const nextLeader = makeNode(548, 106, "New leader", "sees history", "#f0cf85");

      graph.addCells([
        oldLeader,
        nodeA,
        nodeB,
        nextLeader,
        makeLink(oldLeader, nodeA, "majority", "#73c7c7", [{ x: 214, y: 92 }]),
        makeLink(oldLeader, nodeB, "", "#73c7c7", [{ x: 228, y: 224 }]),
        makeLink(nodeA, nextLeader, "overlap", "#f0cf85", [{ x: 480, y: 94 }]),
        makeLink(nodeB, nextLeader, "", "#f0cf85", [{ x: 480, y: 238 }]),
      ]);

      fit(paper);
    };

    const drawSplitBrain = () => {
      const { graph, paper } = makePaper(diagramHost, 760, 330);
      const minorityA = makeNode(44, 56, "Node A", "minority", "#b8a6ff");
      const minorityB = makeNode(44, 198, "Node B", "minority", "#b8a6ff");
      const barrier = makeNode(300, 126, "Partition", "no quorum", "#e99fc7");
      const majorityC = makeNode(546, 26, "Node C", "majority", "#73c7c7");
      const majorityD = makeNode(546, 168, "Node D/E", "can elect", "#73c7c7");

      graph.addCells([
        minorityA,
        minorityB,
        barrier,
        majorityC,
        majorityD,
        makeLink(minorityA, barrier, "blocked", "#b8a6ff", [{ x: 214, y: 100 }]),
        makeLink(minorityB, barrier, "", "#b8a6ff", [{ x: 222, y: 242 }]),
        makeLink(majorityC, majorityD, "3 votes", "#73c7c7", [
          { x: 640, y: 142 },
        ]),
        makeLink(majorityD, barrier, "safe side", "#73c7c7", [
          { x: 494, y: 236 },
          { x: 438, y: 236 },
        ]),
      ]);

      fit(paper);
    };

    const drawers: Record<DiagramVariant, () => void> = {
      failure: drawFailure,
      "leader-election": drawElection,
      "log-replication": drawReplication,
      majority: drawMajority,
      "split-brain": drawSplitBrain,
    };

    drawers[variant]();
  });
</script>

<figure class="diagram-block" aria-label={diagramCopy[variant].label}>
  <section class="diagram-panel">
    <div class="diagram-heading">
      <h3>{diagramCopy[variant].title}</h3>
    </div>
    <div class="diagram-scroll" aria-label="Scrollable diagram">
      <div bind:this={diagramHost} class="joint-diagram"></div>
    </div>
  </section>

  <figcaption>{diagramCopy[variant].caption}</figcaption>
</figure>

<style>
  .diagram-block {
    margin: 1.65rem 0 2.35rem;
  }

  figcaption {
    margin-top: 0.75rem;
    color: var(--muted);
    font-size: 0.82rem;
    line-height: 1.45;
    text-align: center;
  }

  .diagram-panel {
    border: 1px solid var(--border);
    border-radius: 8px;
    background:
      linear-gradient(135deg, rgba(115, 199, 199, 0.06), transparent 34%),
      rgba(20, 18, 26, 0.72);
    overflow: hidden;
  }

  .diagram-heading {
    display: grid;
    gap: 0.35rem;
    padding: 1rem 1rem 0;
  }

  h3 {
    margin: 0;
    color: var(--text);
    font-size: 0.95rem;
    font-weight: 700;
  }

  .diagram-scroll {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-inline: contain;
    scrollbar-width: thin;
    touch-action: pan-x;
  }

  .joint-diagram {
    width: 760px;
    min-width: 760px;
    min-height: 290px;
  }

  :global(.joint-diagram svg) {
    display: block;
    width: 760px;
    max-width: none;
    pointer-events: none;
  }

  @media (max-width: 760px) {
    .joint-diagram {
      min-height: 240px;
    }
  }
</style>
