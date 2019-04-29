---
title: Simulation Algorithme Garbage Collector
subtitle: Rapport
lang: fr
author:
- Bulloni Lucas <lucas.bulloni@he-arc.ch>
date: \today
pagesize: A4
numbersections: true
documentclass: scrartcl
geometry: margin=2.5cm
bibliography: rapport.bib
header-includes: |
      \usepackage{fancyhdr}
      \pagestyle{fancy}
      \fancyhead[R]{Lucas Bulloni \& Raphael Margueron}
      \usepackage{float}
      \floatplacement{figure}{H}
---

\newpage

\tableofcontents

\newpage

# Introduction

Ce projet consiste en une simulation Javascript pour mettre en illustration les 2 algorithmes de garbace collection vu pendant le cours de J2EE. 

## Mark & Sweep

L'algorithme Mark & Sweep  [@MarkNSweepJEE] consiste à parcours la mémoirs en arbre et de marqués tous les objects qui ont été visités. A la fin de la visite, on supprime tous les noeuds non-marqués. Ensuite il faut supprimer tous les noeuds non-marqués, mais pour cela il faut garder la liste des tous les objets (heap). Voici le pseudo code de l'algorithme :


Il faut visiter toutes les racines pour marqués les enfants : 

```
mark_sweep(root)
    For rootObjet in root
        mark(rootObjet)
    End For
sweep()
```
On va marquer tous les enfants de la racine

```
mark(root)
    If markedBit(root) = false then
        markedBit(root) = true
    For each child referenced by root
        mark(v)
```

Et finalement on va supprimer les racinces

```
sweep()
    For each object o in heap
        If markedBit(o) = true then
            markedBit(o) = false
        else
            heap.release(o)
```

## Copying



# Manuel utilisateur

la simulation étant une application javascript. Il faut garder la structure du dossier tel quel. Ensuite il faut ouvrir le fichier index.html ou index-copying.html dans le navigateur.

Le fichier index.html est la simulation Mark & Sweep et index-copying.html la simulation Copying. On peut faire avancer la simulaton avec le bouton "Suivant" [1] et on peut la réinitialiser avec le bouton "Réinitaliser la simulation" [2]. Il y a aussi un lien vers l'autre simulation [3].présentation

# Bibliothèques utilisés

- Cytoscape : Dessin des arbres

# Réalisation



# Conclusion

.

\newpage

\listoffigures

# References

