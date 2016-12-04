const input = "L5, R1, L5, L1, R5, R1, R1, L4, L1, L3, R2, R4, L4, L1, L1, R2, R4, R3, L1, R4, L4, L5, L4, R4, L5, R1, R5, L2, R1, R3, L2, L4, L4, R1, L192, R5, R1, R4, L5, L4, R5, L1, L1, R48, R5, R5, L2, R4, R4, R1, R3, L1, L4, L5, R1, L4, L2, L5, R5, L2, R74, R4, L1, R188, R5, L4, L2, R5, R2, L4, R4, R3, R3, R2, R1, L3, L2, L5, L5, L2, L1, R1, R5, R4, L3, R5, L1, L3, R4, L1, L3, L2, R1, R3, R2, R5, L3, L1, L1, R5, L4, L5, R5, R2, L5, R2, L1, L5, L3, L5, L5, L1, R1, L4, L3, L1, R2, R5, L1, L3, R4, R5, L4, L1, R5, L1, R5, R5, R5, R2, R1, R2, L5, L5, L5, R4, L5, L4, L4, R5, L2, R1, R5, L1, L5, R4, L3, R4, L2, R3, R3, R3, L2, L2, L2, L1, L4, R3, L4, L2, R2, R5, L1, R2";

const answer1 = (path => {
  const
    NORTH = 0,
    EAST = 1,
    SOUTH = 2,
    WEST = 3,
    directions = [NORTH, EAST, SOUTH, WEST];
    
  let
    x = 0,
    y = 0,
    heading = NORTH;
    
  path.forEach(step => {
    const 
      steering = (step[0] === 'R' ? 1 : directions.length - 1),
      distance = parseInt(step.substring(1), 10);
      
    heading = (heading + steering) % directions.length;
    
    switch (heading) {
      case NORTH:
        x += distance; break;
      case EAST:
        y += distance; break;
      case SOUTH:
        x -= distance; break;
      case WEST:
        y -= distance; break;
    }
  });
  
  return Math.abs(x) + Math.abs(y);
})(input.split(', '));

console.log('Day 1, Answer 1:', answer1);

const answer2 = (path => {
  const
    NORTH = 0,
    EAST = 1,
    SOUTH = 2,
    WEST = 3,
    directions = [NORTH, EAST, SOUTH, WEST];
    
  let
    x = 0,
    y = 0,
    ix = x,
    iy = y,
    found = false,
    heading = NORTH,
    positions = {[x + ',' + y]: true};
    
  path.forEach(step => {
    const 
      steering = (step[0] === 'R' ? 1 : directions.length - 1),
      distance = parseInt(step.substring(1), 10);
      
    heading = (heading + steering) % directions.length;
    
    Array(distance).fill(1).forEach(move => {
      switch (heading) {
        case NORTH:
          x++; break;
        case EAST:
          y++; break;
        case SOUTH:
          x--; break;
        case WEST:
          y--; break;
      }
      
      if (!found && positions[x + ',' + y]) {
        ix = x;
        iy = y;
        found = true;
        return false;
      }
      
      positions[x + ',' + y] = true;
    });
    
    return !found;
  });
  
  return Math.abs(ix) + Math.abs(iy);
})(input.split(', '));

console.log('Day 1, Answer 2:', answer2);
