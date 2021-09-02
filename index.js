const data = [
  { name: 'World', parent: '' },
  { name: 'Europe', parent: 'World' },
  { name: 'South America', parent: 'World' },
  { name: 'Africa', parent: 'World' },
  { name: 'Croatia', parent: 'Europe', amount: 5 },
  { name: 'Ireland', parent: 'Europe', amount: 1 },
  { name: 'Austria', parent: 'Europe', amount: 8 },
  { name: 'Italia', parent: 'Europe', amount: 4 },
  { name: 'Spain', parent: 'Europe', amount: 4 },
  { name: 'Germany', parent: 'Europe', amount: 9 },
  { name: 'Slovenia', parent: 'Europe', amount: 4 },
  { name: 'Hungary', parent: 'Europe', amount: 7 },
  { name: 'Colombia', parent: 'South America', amount: 5 },
  { name: 'Ecuador', parent: 'South America', amount: 2 },
  { name: 'Peru', parent: 'South America', amount: 5 },
  { name: 'Argentina', parent: 'South America', amount: 5 },
  { name: 'Chile', parent: 'South America', amount: 3 },
  { name: 'Brazil', parent: 'South America', amount: 10 },
  { name: 'Urugvay', parent: 'South America', amount: 2 },
  { name: 'Cameroon', parent: 'Africa', amount: 6 },
  { name: 'Ghana', parent: 'Africa', amount: 3 },
  { name: 'Morocco', parent: 'Africa', amount: 3 },
  { name: 'Tunisia', parent: 'Africa', amount: 2 },
  { name: 'Egypt', parent: 'Africa', amount: 5 },
  { name: 'Nigeria', parent: 'Africa', amount: 4 },
  { name: 'Uganda', parent: 'Africa', amount: 7 },
  { name: 'Libya', parent: 'Africa', amount: 6 },
];

const svg = d3
  .select('.canvas')
  .append('svg')
  .attr('width', 1060)
  .attr('height', 800);

const graph = svg.append('g').attr('transform', 'translate(50, 50)'); // to give a 50px margin

const stratify = d3
  .stratify()
  .id((d) => d.name)
  .parentId((d) => d.parent);

const rootNode = stratify(data).sum((d) => d.amount);

const pack = d3.pack().size([960, 700]).padding(5);

const bubbleData = pack(rootNode).descendants();

// create an ordinal scale
const colour = d3.scaleOrdinal(['#322bfb', '#4640fb', '#5a55fb']);

// join data and add group for each node
const nodes = graph
  .selectAll('g')
  .data(bubbleData)
  .enter()
  .append('g')
  .attr('transform', (d) => `translate(${d.x}, ${d.y})`);
// returns an array of nodes entered into the DOM (groups)

//console.log(nodes)

// add circle to each group
nodes
  .append('circle')
  .attr('r', (d) => d.r)
  .attr('stroke', 'white')
  .attr('stroke-width', 2)
  .attr('fill', (d) => colour(d.depth));

// add text to each group
nodes
  .filter((d) => !d.children)
  .append('text')
  .attr('text-anchor', 'middle')
  .attr('dy', '0.3em')
  .attr('fill', 'white')
  .style('font-size', (d) => d.value * 3)
  .text((d) => d.data.name);
