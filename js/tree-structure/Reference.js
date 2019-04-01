export class Reference
{
  constructor(id, source, target)
  {
    this.id = id;
    this.source = source;
    this.group = 'edges';
    this.target = target;
  }

  convertToCyNodes()
  {
    let targetId;

    if(this.target === null)
    {
      targetId = null;
    }
    else
    {
      targetId = this.target.id;
    }

    return {
      group: this.group,
      data : {
        id : this.id,
        source : this.source.id,
        target : targetId
      }
    };
  }
}
