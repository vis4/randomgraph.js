randomgraph.js
==============

```javascriot
/* Erdős–Rényi (n, p)
 *
 * n .. number of nodes
 * p .. edge probability
 */
graph = randomgraph.ER(150, 0.05);

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
