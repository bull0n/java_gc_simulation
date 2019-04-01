import { Reference } from './Reference.js';

export class Object
{
  constructor(id, simulation)
  {
    this.id = id;
    this.group = 'nodes';
    this.references = [];
    this.marked = false;
    this.simulation = simulation;

    this.simulation.getObjectNodes().push(this);
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
      if(element.target !== null)
      {
        if(nodesIn.includes(element) !== undefined)
        {
          cyNodes.push(element.convertToCyNodes());
          nodesIn.push(element)
        }
      }
    });
  }

  markRecursive()
  {
    this.mark();

    this.references.forEach(function(element)
    {
      element.target.markRecursive();
    });
  }

  markRecursive2()
  {
    let hasMarked = false;

    for(let i = 0; i < this.references.length && !hasMarked; i++)
    {
      hasMarked = this.references[i].target.markRecursive2();
    }

    if(!hasMarked && !this.marked)
    {
      this.mark();
      hasMarked = true;
    }

    return hasMarked
  }

  mark()
  {
    this.marked = true;

    this.simulation.cy.nodes(`#${this.id}`).animate({
        style: { 'background-color': 'red' }
      }, {
        duration: 300
    });
  }

  getNextLeafForCopy(reference = null)
  {
    if(this.references.length === 0)
    {
      return this.deleteTarget(reference);
    }
    else
    {
      for(let i = 0; i < this.references.length; i++)
      {
        let child = this.references[i].target;

        if(child !== null)
        {
          return child.getNextLeafForCopy(this.references[i]);
        }

        if(i == this.references.length - 1)
        {
          return this.deleteTarget(reference);
        }
      }
    }
  }

  deleteTarget(reference)
  {
    if(reference !== null)
    {
      reference.target = null;
    }

    return this
  }
}
