# HTML Report Format

RULE: Write one self-contained HTML file in OS temp dir. Static only except Tailwind CDN + Mermaid CDN.

## Scaffold

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Architecture review — {{repo name}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="module">
      import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
      mermaid.initialize({ startOnLoad: true, theme: "neutral", securityLevel: "loose" });
    </script>
    <style>
      .seam { stroke-dasharray: 4 4; }
      .leak { stroke: #dc2626; }
      .deep { background: linear-gradient(135deg, #0f172a, #1e293b); }
    </style>
  </head>
  <body class="bg-stone-50 text-slate-900 font-sans">
    <main class="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <header>...</header>
      <section id="candidates" class="space-y-10">...</section>
      <section id="top-recommendation">...</section>
    </main>
  </body>
</html>
```

## Header

Include: repo, date, legend: solid box=module; dashed line=seam; red arrow=leakage; dark thick box=deep module.

## Candidate `<article>`

MUST include:
- Title.
- Badges: `Strong`/`Worth exploring`/`Speculative`; dependency category.
- Monospace files list.
- Before/after diagram side-by-side.
- Problem: one sentence.
- Solution: one sentence.
- Wins: bullets, max 6 words.
- ADR callout if conflict/reopen.

## Diagrams

Use best fit:
- Mermaid graph/flow/sequence for call/dependency graphs.
- Hand-built boxes + SVG arrows if Mermaid layout fails.
- Cross-section for stacked shallow layers.
- Mass diagram for interface vs implementation size.
- Call-graph collapse for before tree → after deep module.

Mermaid example:

```html
<div class="rounded-lg border border-slate-200 bg-white p-4">
  <pre class="mermaid">
    flowchart LR
      A[OrderHandler] --> B[OrderValidator]
      B --> C[OrderRepo]
      C -.leak.-> D[PricingClient]
      classDef leak stroke:#dc2626,stroke-width:2px;
      class C,D leak
  </pre>
</div>
```

## Style

- Sparse; visual; whitespace.
- Accents: emerald/indigo; red leakage; amber warnings.
- Diagrams ~320px high.
- Module labels: `text-xs uppercase tracking-wider`.

## Top recommendation

Include candidate name, one-sentence reason, anchor link.

## Vocabulary

Use: module, interface, implementation, depth, deep, shallow, seam, adapter, leverage, locality.
Avoid: component, service, unit, API, signature, boundary, layer, wrapper.
