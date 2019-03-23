import { Simulation } from './Simulation.js';
import { Object } from './tree-structure/Object.js';

document.addEventListener("DOMContentLoaded", function(event) {
  main();
});

function main()
{
  let divMarkSweep = document.getElementById('mark-sweep');
  let divListObjects = document.getElementById('list-objects-container');

  let simulation = new Simulation(divMarkSweep, divListObjects);

  buildObjects(simulation);

  simulation.render();
  simulation.update();

  let notFinished = true;
  while(notFinished)
  {
    notFinished = simulation.nextMarkTree();
  }
  simulation.deleteUnmarked();
}

function buildObjects(simulation)
{
  let a = new Object('a', simulation);
  let b = new Object('b', simulation);
  let c = new Object('c', simulation);

  a.addChildrenObject(b);
  a.addChildrenObject(c);

  b.addChildrenObject(new Object('d', simulation));
  let e = new Object('e', simulation);
  b.addChildrenObject(e);

  let f = new Object('f', simulation);

  b.addChildrenObject(f)

  c.addChildrenObject(f);
  c.addChildrenObject(new Object('g', simulation));
  c.addChildrenObject(new Object('h', simulation));

  e.addChildrenObject(new Object('i', simulation));

  new Object('o', simulation)

  simulation.setRoot(a);
}
