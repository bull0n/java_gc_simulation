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
    return {
      group: this.group,
      data : {
        id : this.id,
        source : this.source.id,
        target : this.target.id
      }
    };
  }
}
