import { Reference } from './Reference.js';

export class Object
{
  constructor(id, simulation)
  {
    this.id = id;
    this.group = 'nodes';
    this.references = [];

    simulation.objectNodes.push(this);
  }

  addChildrenObject(object)
  {
    this.references.push(new Reference(`${this.id}-${object.id}`, this, object));
  }

  convertToCyNodes(cyNodes, nodesIn)
  {
    if(nodesIn.includes(this) !== undefined)
    {
      cyNodes.push({
        group : this.group,
        data : {id : this.id}
      });
    }

    this.references.forEach(function(element)
    {
      if(nodesIn.includes(element) !== undefined)
      {
        cyNodes.push(element.convertToCyNodes());
        nodesIn.push(element)
      }
    });
  }
}
