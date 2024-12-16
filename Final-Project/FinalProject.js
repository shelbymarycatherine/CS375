void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    uv -= vec2(0.5, 0.5);

    // Nebula
    vec3 nebulaColor1 = vec3(0.0, 1.0, 1.0); // Cyan
    vec3 nebulaColor2 = vec3(1.0, 0.0, 1.0); // Purple
    float alpha1 = 0.5; 
    float alpha2 = 0.5; 

    vec3 nebulaColor = mix(nebulaColor1, nebulaColor2, alpha1 * alpha2);

    // Background
    vec3 color = vec3(0.0);

    // Color
    const int numCloudsRight = 50;
    for (int i = 0; i < numCloudsRight; i++) {
        vec2 cloudPosition = vec2(fract(sin(float(i) * 0.3215) * 43758.5453) - 0.5, fract(sin(float(i) * 0.6789) * 43758.5453) - 0.5);
        cloudPosition *= 2.0;
        cloudPosition.y += 0.5;
        float cloudSize = 0.1 + 0.3 * fract(sin(float(i) * 0.9876) * 43758.5453);
        float cloudAlpha = 0.2 + 0.3 * fract(sin(float(i) * 0.9876) * 43758.5453);
        float cloudDist = length(uv - cloudPosition);
        float cloudBrightness = exp(-cloudDist * 3.0);
        vec3 cloudColor = vec3(0.0, 1.0, 1.0) * cloudBrightness;
        color = mix(color, cloudColor, cloudAlpha);
    }

    // Galaxy
    const int numPlanets = 750;
    float timeStars = iTime * 0.2;

    for (int i = 0; i < numPlanets; i++) {
        float radius = -1.2 * fract(sin(float(i) * 1.2345) * 43758.5453) * 0.5;
        float angle = 0.3 * fract(sin(float(i) * 2.3456) * 43758.5453) * 6.2831;
        angle += timeStars * (0.2 + radius * 0.3);
        vec2 starPos = 1.0 * radius * vec2(cos(angle), sin(angle));
        float dist = length(uv - starPos);
        float brightness = 1.0 / (1.0 + radius * 20.0);
        color += vec3(1.0, 0.8, 0.5) * exp(-dist * 50.0) * brightness;
    }

    // Stars
    const int numStars = 2000;
    for (int i = 0; i < numStars; i++) {
        float randX = fract(sin(float(i) * 12.9898) * 43758.5453);
        float randY = fract(sin(float(i) * 78.233) * 43758.5453);
        float starSize = 0.0005 + 0.001 * fract(sin(float(i) * 23.456) * 43758.5453);
        float starBrightness = 0.3 + 0.7 * fract(sin(float(i) * 95.123) * 43758.5453);
        vec2 starPos = vec2(randX, randY) - 0.5;
        starPos.x *= iResolution.x / iResolution.y;
        float dist = length(uv - starPos);
        color += vec3(1.0) * starBrightness * exp(-dist / starSize);
    }


    fragColor = vec4(min(pow(abs(color), vec3(1.2)), 1.0), 1.0);
}

