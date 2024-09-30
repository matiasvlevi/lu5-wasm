function setup()
    createWindow(400, 400);
    textAlign(CENTER);
end

function draw()
    background('magenta');

    text('This is from ./sketch.lua', width/2, height/2);
end