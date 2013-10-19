(function() {

    var randomgraph = {

        /*
         * Simple balanced tree
         *
         * @param r number of children each node has
         * @param h height of the tree
         */
        BalancedTree: function(r, h) {
            var v = 0,
                graph = { nodes: [{ label: 'node 0', index: 0 }], edges: [] },
                newLeaves = [],
                i, j, height, node, leaves;

            for (i = 0; i < r; i++) {
                node = { label: 'node '+(++v), index: (v-1) };
                graph.nodes.push(node);
                newLeaves.push(node);
                graph.edges.push({ source: 0, target: v });
            }

            for (height = 1; height < h; height++) {
                leaves = newLeaves;
                newLeaves = [];
                for (j = 0; j < leaves.length; j++) {
                    for (i = 0; i < r; i++) {
                        node = { label: 'node '+(++v), index: (v-1) };
                        newLeaves.push(node);
                        graph.nodes.push(node);
                        graph.edges.push({ source: leaves[j].index, target: v });
                    }
                }
            }
            return graph;
        },

        ErdosRenyi: {
            /**
             * Erdős–Rényi aka Gilbert
             *
             * @param n number of nodes
             * @param p probability of a edge between any two nodes
             */
            np: function(n, p) {
                var graph = { nodes: [], edges: [] },
                    i, j;
                for (i = 0; i < n; i++) {
                    graph.nodes.push({ label: 'node '+i });
                    for (j = 0; j < i; j++) {
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
             * Erdős–Rényi aka Gilbert
             *
             * @param n number of nodes
             * @param m number of edges
             */
            nm: function(n, m) {
                var graph = { nodes: [], edges: [] },
                    tmpEdges = [],
                    i, j, k;
                for (i = 0; i < n; i++) {
                    graph.nodes.push({ label: 'node '+i });
                    for (j = i+1; j < n; j++) {
                        tmpEdges.push({ source: i, target: j });
                    }
                }
                // pick m random edges from tmpEdges
                k = tmpEdges.length - 1;
                for (i = 0; i < m; i++) {
                    graph.edges.push(tmpEdges.splice(Math.floor(Math.random()*k), 1)[0]);
                    k--;
                }
                return graph;
            }

        },

        WattsStrogatz: {


            /**
             * Watts-Strogatz Small World model Alpha
             *
             * @param n number of nodes
             * @param K mean degree (even integer)
             * @param alpha rewiring probability [0..1]
             */
            alpha: function(n, k, alpha) {
                var graph = { nodes: [], edges: [] },
                    i, j, edge,
                    p = Math.pow(10, -10),
                    ec = 0,
                    edge_lut = {},
                    ids = [],
                    nk_half = n * k / 2,
                    Rij, sumRij, r, pij;

                for (i = 0; i < n; i++) {
                    graph.nodes.push({ label: 'node '+i });
                    // create a latice ring structure
                    edge = { source: i, target: (i+1)%n };
                    edge_lut[edge.source+'-'+edge.target] = edge;
                    graph.edges.push(edge);
                    ec++;
                }
                // Creating n * k / 2 edges
                while (ec < nk_half) {
                    for (i = 0; i < n; i++) {
                        ids.push(i);
                    }
                    while (ec < nk_half && ids.length > 0) {
                        i = ids.splice(Math.floor(Math.random()*ids.length), 1)[0];
                        Rij = [];
                        sumRij = 0;
                        for (j = 0; j < n; j++) {
                            Rij[j] = calculateRij(i, j);
                            sumRij += Rij[j];
                        }
                        r = Math.random();
                        pij = 0;
                        for (j = 0; j < n; j++) {
                            if (i != j) {
                                pij += Rij[j] / sumRij;
                                if (r <= pij) {
                                    edge = { source: i, target: j };
                                    graph.edges.push(edge);
                                    ec++;
                                    edge_lut[edge.source+'-'+edge.target] = edge;
                                }
                            }
                        }
                    }
                }

                return graph;

                function calculateRij(i, j) {
                    if (i == j || edge_lut[i+'-'+j]) return 0;
                    var mij = calculatemij(i, j);
                    if (mij >= k) return 1;
                    if (mij === 0) return p;
                    return Math.pow(mij / k, alpha) * (1 - p) + p;
                }

                function calculatemij(i, j) {
                    var mij = 0, l;
                    for (l = 0; l < n; l++) {
                        if (l != i && l != j && edge_lut[i+'-'+l] && edge_lut[j+'-'+l]) {
                            mij++;
                        }
                    }
                    return mij;
                }
            },

            /**
             * Watts-Strogatz Small World model Beta
             *
             * @param n number of nodes
             * @param K mean degree (even integer)
             * @param beta rewiring probability [0..1]
             */
            beta: function(n, K, beta) {
                var graph = { nodes: [], edges: [] },
                    i, j, t, edge,
                    edge_lut = {};
                K = K>>1; // divide by two
                for (i = 0; i < n; i++) {
                    graph.nodes.push({ label: 'node '+i });
                    // create a latice ring structure
                    for (j = 1; j <= K; j++) {
                        edge = { source: i, target: (i+j)%n };
                        edge_lut[edge.source+'-'+edge.target] = edge;
                        graph.edges.push(edge);
                    }
                }
                // rewiring of edges
                for (i = 0; i < n; i++) {
                    for (j = 1; j <= K; j++) { // for every pair of nodes
                        if (Math.random() <= beta) {
                            do {
                                t = Math.floor(Math.random() * (n-1));
                            } while (t == i || edge_lut[i+'-'+t]);
                            var j_ = (i+j)%n;
                            edge_lut[i+'-'+j_].target = t; // rewire
                            edge_lut[i+'-'+t] = edge_lut[i+'-'+j_];
                            delete edge_lut[i+'-'+j_];
                        }
                    }
                }
                return graph;
            }
        },

        /**
         * Barabási–Albert
         *
         * @param N total number of nodes  N  > 0
         * @param m0  m0 > 0 && m0 <  N
         * @param M    M  > 0 && M  <= m0
         */
        BarabasiAlbert: function(N, m0, M) {
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
                for (j = i+1; j < m0; j++) {
                    edge = { source: i, target: j };
                    edge_lut[edge.source+'-'+edge.target] = edge;
                    graph.edges.push(edge);
                    degrees[i]++;
                    degrees[j]++;
                }
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
                            edge_lut[edge.source+'-'+edge.target] = edge;
                            graph.edges.push(edge);
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
        module.exports = randomgraph;
    }

    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `numeral` as a global object via a string identifier,
        // for Closure Compiler 'advanced' mode
        this['randomgraph'] = randomgraph;
    }

    /*global define:false */
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return randomgraph;
        });
    }

})();