randomgraph.js
==============

A small library for generating, well, random graphs. Not that many
models at the moment, feel free to jump in and add some more. The algorithms
were partly ported and double-checked with the [Gephi implementations](https://github.com/cbartosiak/gephi-plugins/tree/complex-generators/ComplexGeneratorPlugin/src/org/gephi/io/complexgenerator/plugin) (thx @jacomyal for the link).

![preview](http://vis4.net/tmp/screenshots/screenshot%202013-10-17%20um%2016.55.10.png)

<a name="randomgraph"></a>
#Documentation
**Members**

* [randomgraph](#randomgraph)
  * [randomgraph.BalancedTree(r, h)](#randomgraph.BalancedTree)
  * [randomgraph.BarabasiAlbert(N, m0, M)](#randomgraph.BarabasiAlbert)
  * [randomgraph.ErdosRenyi](#randomgraph.ErdosRenyi)
    * [ErdosRenyi.np(n, p)](#randomgraph.ErdosRenyi.np)
    * [ErdosRenyi.nm(n, M)](#randomgraph.ErdosRenyi.nm)
  * [randomgraph.WattsStrogatz](#randomgraph.WattsStrogatz)
    * [WattsStrogatz.alpha(n, K, alpha)](#randomgraph.WattsStrogatz.alpha)
    * [WattsStrogatz.beta(n, K, beta)](#randomgraph.WattsStrogatz.beta)

<a name="randomgraph.BalancedTree"></a>
##randomgraph.BalancedTree(r, h)
Simple balanced tree

**Params**

- r `Number` - number of children each node has  
- h `Number` - height of the tree  

<a name="randomgraph.BarabasiAlbert"></a>
##randomgraph.BarabasiAlbert(N, m0, M)
Barabási–Albert

**Params**

- N `Number` - total number of nodes  N  > 0  
- m0 `Number` - m0 > 0 && m0 <  N  
- M `Number` - M  > 0 && M  <= m0  

<a name="randomgraph.ErdosRenyi"></a>
##randomgraph.ErdosRenyi
**Members**

* [randomgraph.ErdosRenyi](#randomgraph.ErdosRenyi)
  * [ErdosRenyi.np(n, p)](#randomgraph.ErdosRenyi.np)
  * [ErdosRenyi.nm(n, M)](#randomgraph.ErdosRenyi.nm)

<a name="randomgraph.ErdosRenyi.np"></a>
###ErdosRenyi.np(n, p)
Erdős–Rényi aka Gilbert

**Params**

- n `Number` - number of nodes  
- p `Number` - probability of a edge between any two nodes  

<a name="randomgraph.ErdosRenyi.nm"></a>
###ErdosRenyi.nm(n, M)
Erdős–Rényi

**Params**

- n `Number` - number of nodes  
- M `Number` - number of edges  

<a name="randomgraph.WattsStrogatz"></a>
##randomgraph.WattsStrogatz
**Members**

* [randomgraph.WattsStrogatz](#randomgraph.WattsStrogatz)
  * [WattsStrogatz.alpha(n, K, alpha)](#randomgraph.WattsStrogatz.alpha)
  * [WattsStrogatz.beta(n, K, beta)](#randomgraph.WattsStrogatz.beta)

<a name="randomgraph.WattsStrogatz.alpha"></a>
###WattsStrogatz.alpha(n, K, alpha)
Watts-Strogatz Small World model Alpha

**Params**

- n `Number` - number of nodes  
- K `Number` - mean degree (even integer)  
- alpha `Number` - rewiring probability [0..1]  

<a name="randomgraph.WattsStrogatz.beta"></a>
###WattsStrogatz.beta(n, K, beta)
Watts-Strogatz Small World model Beta

**Params**

- n `Number` - number of nodes  
- K `Number` - mean degree (even integer)  
- beta `Number` - rewiring probability [0..1]  
