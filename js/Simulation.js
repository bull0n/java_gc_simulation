export class Simulation
{
  constructor(container)
  {
    this.container = container
    this.cy = null;
    this.nodeRoot = [ // list of graph elements to start with
      { // node a
        data: { id: 'a' }
      },
      { // node b
        data: { id: 'b' }
      },
      { // node c
        data: { id: 'c' }
      },
      { // edge ab
        data: { id: 'ab', source: 'a', target: 'b' }
      },
      { // edge ab
        data: { id: 'ac', source: 'a', target: 'c' }
      }
    ];

    this.render();
  }

  render()
  {
    this.cy = cytoscape({
      container: this.container,
      elements: this.nodeRoot,
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
}
