import { Simulation as MarkAndSweep } from './SimulationMarkAndSweep.js';
import { Simulation as Copying } from './SimulationCopying.js';
import { Object } from './tree-structure/Object.js';

let simulation = null;

document.addEventListener('DOMContentLoaded', function(event) {
  main();
});

document.getElementById('next').addEventListener('click', function(event) {
  nextStep()
});

document.getElementById('reset').addEventListener('click', function(event) {
  initSimulation()
});

function initSimulation()
{
  document.getElementById('next').disabled = false;

  if(typeof isCopying !== 'undefined')
  {
    let divTree1 = document.getElementById('tree1');
    let divTree2 = document.getElementById('tree2');

    simulation = new Copying(divTree1, divTree2);
  }
  else
  {
    let divMarkSweep = document.getElementById('mark-sweep');
    let divListObjects = document.getElementById('list-objects-container');

    simulation = new MarkAndSweep(divMarkSweep, divListObjects);
  }

  buildObjects(simulation);

  simulation.render();
  simulation.update();

  document.getElementById('action').innerHTML = '-';
}

function nextStep()
{
  if(simulation["root1"])
  {
    simulation.copyNext();
  }
  else
  {
    if(!simulation.nextMarkTree())
    {
      document.getElementById('action').innerHTML = 'Suppression des objets non-marqués';
      simulation.deleteUnmarked();
      document.getElementById('next').disabled = true;
    }
    else
    {
      document.getElementById('action').innerHTML = 'Objet marqué';
    }
  }
}

function main()
{
  initSimulation();
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

  //b.addChildrenObject(f)

  c.addChildrenObject(f);
  c.addChildrenObject(new Object('g', simulation));
  c.addChildrenObject(new Object('h', simulation));

  e.addChildrenObject(new Object('i', simulation));

  new Object('o', simulation)

  simulation.setRoot(a);
}
