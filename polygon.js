function colorPyramid() {
    quad1(12, 13, 14);
    quad1(12, 14, 15);
    quad1(14, 13, 15);
    quad1(15, 13, 12);
}

function quad1(a, b, c) {
    var indices = [a, b, c];
    var ab = subtract(vertices[indices[1]], vertices[indices[2]]);
    var ac = subtract(vertices[indices[2]], vertices[indices[0]]);
    var normal = vec3(cross(ab, ac));
    normalsArray.push(normal);
    normalsArray.push(normal);
    normalsArray.push(normal);

    pointsArray.push(vertices[indices[0]]);
    texCoordsArray.push(texCoord[0]);

    pointsArray.push(vertices[indices[1]]);
    texCoordsArray.push(texCoord[1]);
    
    pointsArray.push(vertices[indices[2]]);
    texCoordsArray.push(texCoord[2]);

    console.log(a);
}

function triangle(a, b, c) {
    var cb = subtract(b, c);
    var ca = subtract(a, c);
    var normal = cross(cb, ca);
    normal = normalize(normal);
    normalsArray.push(normal);
    normalsArray.push(normal);
    normalsArray.push(normal);

    pointsArray.push(a);
    texCoordsArray.push([sphereScale*Math.acos(a[0])/Math.PI, sphereScale*Math.asin(a[1]/Math.sqrt(1.0-a[0]*a[0]))/Math.PI]);

    pointsArray.push(b);
    texCoordsArray.push([sphereScale*Math.acos(b[0])/Math.PI, sphereScale*Math.asin(b[1]/Math.sqrt(1.0-b[0]*b[0]))/Math.PI]);


    pointsArray.push(c);
    texCoordsArray.push([sphereScale*Math.acos(c[0])/Math.PI, sphereScale*Math.asin(c[1]/Math.sqrt(1.0-c[0]*c[0]))/Math.PI]);

    index += 3;
}

function divideTriangle(a, b, c, count) {
    if (count > 0) {

        var ab = mix(a, b, 0.5);
        var ac = mix(a, c, 0.5);
        var bc = mix(b, c, 0.5);

        ab = normalize(ab, true);
        ac = normalize(ac, true);
        bc = normalize(bc, true);

        divideTriangle(a, ab, ac, count - 1);
        divideTriangle(ab, b, bc, count - 1);
        divideTriangle(bc, c, ac, count - 1);
        divideTriangle(ab, bc, ac, count - 1);
    } else {
        triangle(a, b, c);
    }
}

function tetrahedron(a, b, c, d, n) {
    divideTriangle(a, b, c, n);
    divideTriangle(d, c, b, n);
    divideTriangle(a, d, b, n);
    divideTriangle(a, c, d, n);
}

function quad(a, b, c, d) {

    var t1 = subtract(vertices[a], vertices[d]);
    var t2 = subtract(vertices[c], vertices[d]);
    var normal = cross(t1, t2);
    var normal = vec3(normal);
    normal = normalize(normal);

    pointsArray.push(vertices[a]);
    normalsArray.push(normal);
    texCoordsArray.push(texCoord[0]);

    pointsArray.push(vertices[b]);
    normalsArray.push(normal);
    texCoordsArray.push(texCoord[1]);

    pointsArray.push(vertices[c]);
    normalsArray.push(normal);
    texCoordsArray.push(texCoord[2]);

    pointsArray.push(vertices[a]);
    normalsArray.push(normal);
    texCoordsArray.push(texCoord[0]);

    pointsArray.push(vertices[c]);
    normalsArray.push(normal);
    texCoordsArray.push(texCoord[2]);
    
    pointsArray.push(vertices[d]);
    normalsArray.push(normal);
    texCoordsArray.push(texCoord[3]);
}


function colorCube() {
    quad(1, 0, 3, 2);
    quad(2, 3, 7, 6);
    quad(3, 0, 4, 7);
    quad(6, 5, 1, 2);
    quad(4, 5, 6, 7);
    quad(5, 4, 0, 1);
}