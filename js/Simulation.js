import { Object } from './tree-structure/Object.js';

export class Simulation
{
  constructor(containerTree, containerListObject)
  {
    this.containerTree = containerTree;
    this.containerListObject = containerListObject;
    this.cy = null;
    this.root = null;
    this.objectNodes = [];
  }

  update()
  {
    if(this.cy !== null)
    {
      this.cy.remove('*');
      this.cy.add(this.convertRootsToCyNodes());
      this.cy.layout(this.getLayout()).run();
    }
  }

  getLayout()
  {
    return {name: 'breadthfirst', roots : `#${this.root.id}`};
  }

  setRoot(root)
  {
    this.root = root;
  }

  displayListObject()
  {
    if(this.containerListObject)
    {
      while (this.containerListObject.firstChild) {
        this.containerListObject.removeChild(this.containerListObject.firstChild);
      }

      let listContainer = document.createElement('ul');
      this.objectNodes.forEach(function(element)
      {
        let li = document.createElement('li');
        li.innerHTML = element.id;

        if(element.marked)
        {
          li.className = "marked";
        }

        listContainer.appendChild(li);
      });

      this.containerListObject.appendChild(listContainer);
    }
  }

  addObjectNode(objectNode)
  {
    this.objectNodes.push(objectNode);

    if(this.cy !== null)
    {
      this.cy.add(root.convertToCyNodes());
    }
  }

  nextMarkTree()
  {
    let result = this.root.markRecursive2();
    this.displayListObject();
    return result;
  }

  markTree()
  {
    this.root.markRecursive();
    this.displayListObject();
  }

  deleteUnmarked()
  {
    for(let i = 0; i < this.objectNodes.length; i++)
    {
      if(!this.objectNodes[i].marked)
      {
        this.objectNodes.splice(i, 1);
      }
    }

    this.render();
  }

  render()
  {
    this.cy = cytoscape({
      container: this.containerTree,
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

      layout: this.getLayout()
    });

    this.displayListObject();
  }

  convertRootsToCyNodes()
  {
    let nodes = [];
    let nodesIn = [];

    this.objectNodes.forEach(function(element)
    {
      element.convertToCyNodes(nodes, nodesIn);
    });

    return nodes;
  }
}
