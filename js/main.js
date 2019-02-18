import { Simulation } from './Simulation.js';

document.addEventListener("DOMContentLoaded", function(event) {
  main();
});

function main()
{
  let divMarkSweep = document.getElementById('mark-sweep');

  let simulation = new Simulation(divMarkSweep);

}
