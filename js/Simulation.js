import { Object } from './tree-structure/Object.js';

export class Simulation
{
  constructor(container)
  {
    this.container = container
    this.cy = null;
    this.roots = [];
  }

  update()
  {
    if(this.cy !== null)
    {
      this.cy.remove('*');
      this.cy.add(this.convertRootsToCyNodes());
      this.cy.layout({name: 'breadthfirst'}).run();
    }
  }

  addRoot(root)
  {
    this.roots.push(root);

    if(this.cy !== null)
    {
      this.cy.add(root.convertToCyNodes());
    }
  }

  render()
  {
    this.cy = cytoscape({
      container: this.container,
      elements: this.convertRootsToCyNodes(),
      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(id)'
          }
        },

        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle'
          }
        }
      ],

      layout: {
        name: 'breadthfirst',
        rows: 1
      }
    });
  }

  convertRootsToCyNodes()
  {
    let nodes = [];
    let nodesIn = [];

    this.roots.forEach(function(element)
    {
      element.convertToCyNodes(nodes, nodesIn);
    });

    return nodes;
  }
}
