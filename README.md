randomgraph.js
==============

A small library for generating, well, random graphs. Not that many
models at the moment, feel free to jump in and add some more. The algorithms
were partly ported and double-checked with the [Gephi implementations](https://github.com/cbartosiak/gephi-plugins/tree/complex-generators/ComplexGeneratorPlugin/src/org/gephi/io/complexgenerator/plugin) (thx @jacomyal for the link).

![preview](http://vis4.net/tmp/screenshots/screenshot%202013-10-17%20um%2016.55.10.png)

```javascriot
/* Erdős–Rényi (n, p)
 *
 * n .. number of nodes
 * p .. edge probability
 */
graph = randomgraph.ErdosRenyi.np(150, 0.05);

/* Watts-Strogatz (n, K, beta)
 *
 * n .. number of nodes
 * K .. mean degree (even integer)
 * beta .. rewiring probability [0..1]
 */
graph = randomgraph.WS(150, 4, 0.4);

/* Barabási–Albert (N, m0, M)
 *
 * N .. number of nodes
 * m0 .. size of connected core (m0 <= N)
 * M .. (M <= m0)
 */
graph = randomgraph.BA(150, 10, 2);

```
