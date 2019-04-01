import { Object } from './tree-structure/Object.js';

export class Simulation
{
  constructor(containerTree1, containerTree2)
  {
    this.containerTree1 = containerTree1;
    this.containerTree2 = containerTree2;
    this.cy1 = null;
    this.cy2 = null;
    this.root1 = null;
    this.root2 = null;
    this.objectNodes1 = [];
    this.objectNodes2 = [];
  }

  getObjectNodes()
  {
    return this.objectNodes1;
  }

  update()
  {
    this.updateCy(this.cy1, this.objectNodes1);
    this.updateCy(this.cy2, this.objectNodes2);
  }

  updateCy(cy, objectNodes)
  {
    if(cy !== null)
    {
      cy.remove('*');
      cy.add(this.convertRootsToCyNodes(objectNodes));
      cy.layout(this.getLayout(objectNodes)).run();
    }
  }

  getLayout(objectNodes)
  {
    let rootId = this.getRoot(objectNodes);

    if(rootId !== null)
    {
      rootId = rootId.id;
    }

    return {name: 'breadthfirst', roots : `#${rootId}`};
  }

  getRoot(objectNodes)
  {
    if(objectNodes == this.objectNodes1)
    {
      return this.root1;
    }
    else
    {
      return this.root2;
    }
  }

  setRoot(root)
  {
    this.root1 = root;
  }

  addObjectNode(objectNode)
  {
    this.objectNodes1.push(objectNode);

    if(this.cy !== null)
    {
      this.cy.add(root.convertToCyNodes());
    }
  }

  copyNext()
  {
    if(this.root1 === null)
    {
      return false;
    }

    let node = this.root1.getNextLeafForCopy();
    let i = this.objectNodes1.indexOf(node);

    if(i > -1)
    {
      this.objectNodes1.splice(i, 1);
    }

    this.copyToOtherZone(node);

    if(node === this.root1)
    {
      this.root1 = null;
    }

    for(let i = 0; i < this.objectNodes1.length; i++)
    {
      for(let j = 0; j < this.objectNodes1[i].references.length; j++)
      {
        let reference = this.objectNodes1[i].references[j];
        if(reference.target == node)
        {
          reference.target = null;
        }
      }
    }

    this.update();

    return true;
  }

  copyToOtherZone(node)
  {
    for(let i = 0; i < node.references.length; i++)
    {
      let targetId = node.references[i].id.split('-')[1];

      for(let j = 0; j < this.objectNodes2.length; j++)
      {
        if(this.objectNodes2[j].id == targetId)
        {
          node.references[i].target = this.objectNodes2[j];
          console.log('rebuilt');
        }
      }
    }

    this.root2 = node;

    this.objectNodes2.push(node);
  }

  deleteNotCopied()
  {
    this.objectNodes1 = [];
    this.root1 = null;
    this.update();
  }

  render()
  {
    this.cy1 = this.renderCy(this.containerTree1, this.objectNodes1);
    this.cy2 = this.renderCy(this.containerTree2, this.objectNodes2);
  }

  renderCy(containerTree, objectNodes)
  {
    return cytoscape({
      container: containerTree,
      elements: this.convertRootsToCyNodes(objectNodes),
      maxZoom: 1,
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

      layout: this.getLayout(objectNodes)
    });
  }

  convertRootsToCyNodes(objectNodes)
  {
    let nodes = [];
    let nodesIn = [];

    objectNodes.forEach(function(element)
    {
      element.convertToCyNodes(nodes, nodesIn);
    });

    return nodes;
  }
}
