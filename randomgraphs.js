(function() {

    var randomgraphs = {

        /**
         * Erdős–Rényi aka Gilbert
         *
         * @param n number of nodes
         * @param p probability of a edge between any two nodes
         */
        ER: function(n, p) {
            var graph = { nodes: [], edges: [] },
                i, j;
            for (i = 0; i < n; i++) {
                graph.nodes.push({ label: 'node '+i });
                for (j = 0; j < i; i++) {
                    if (Math.random() < p) {
                        graph.edges.push({
                            source: i,
                            target: j
                        });
                    }
                }
            }
            return graph;
        },

        /**
         * Watts-Strogatz
         *
         * @param n number of nodes
         * @param K mean degree (even integer)
         * @param beta "special parameter"
         */
        WS: function(n, K, beta) {
            var graph = { nodes: [], edges: [] },
                i, j, t, edge,
                edge_lut = {};
            K = K>>1; // divide by two
            for (i = 0; i < n; i++) {
                graph.nodes.push({ label: 'node '+i });
                // create a latice ring structure
                for (j = 0; j < K; j++) {
                    edge = { source: i, target: (i+j)%n };
                    edge_lut[edge.source+'-'+edge.target] = edge;
                    graph.edges.push(edge);
                }
            }
            // rewiring of edges
            for (i = 0; i < n; i++) {
                for (j = 0; j < K; j++) { // for every pair of nodes
                    do {
                        t = Math.floor(Math.random() * n-1);
                    } while (t == i || edge_lut[i+'-'+t]);
                    edge_lut[i+'-'+j].target = t; // rewire
                    edge_lut[i+'-'+t] = edge_lut[i+'-'+j];
                    delete edge_lut[i+'-'+j];
                }
            }
            return graph;
        },

        /**
         * Barabási–Albert
         *
         * @param N total number of nodes
         * @param m0
         * @param M
         */
        BA: function(N, m0, M) {
            var graph = { nodes: [], edges: [] },
                edge_lut = {},
                degrees = [],
                i, j, edge, sum, s, m, r, p;
            // creating m0 nodes
            for (i = 0; i < m0; i++) {
                graph.nodes.push({ label: 'node '+i });
                degrees[i] = 0;
            }
            // Linking every node with each other (no self-loops)
            for (i = 0; i < m0; i++) {
                edge = { source: i, target: j };
                edge_lut[edge.source+'-'+edge.target] = edge;
                graph.edges.push(edge);
                degrees[i]++;
                degrees[j]++;
            }
            // Adding N - m0 nodes, each with M edges
            for (i = m0; i < N; i++) {
                graph.nodes.push({ label: 'node '+i });
                degrees[i] = 0;
                sum = 0;  // sum of all nodes degrees
                for (j = 0; j < i; j++) sum += degrees[j];
                s = 0;
                for (m = 0; m < M; m++) {
                    r = Math.random();
                    p = 0;
                    for (j = 0; j < i; j++) {
                        if (edge_lut[i+'-'+j] || edge_lut[j+'-'+i]) continue;
                        if (i == 1) p = 1;
                        else p += degrees[j] / sum + s / (i - m);

                        if (r <= p) {
                            s += degrees[j] / sum;
                            edge = { source: i, target: j };
                            degrees[i]++;
                            degrees[j]++;
                            break;
                        }
                    }
                }
            }
            return graph;
        }
    };

    // CommonJS module is defined
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = randomgraphs;
    }

    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `numeral` as a global object via a string identifier,
        // for Closure Compiler 'advanced' mode
        this['randomgraphs'] = randomgraphs;
    }

    /*global define:false */
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return randomgraphs;
        });
    }

})();