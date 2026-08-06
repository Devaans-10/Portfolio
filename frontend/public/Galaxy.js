class GalaxyBackground {
    constructor(options = {}) {
        this.options = Object.assign({
            hueShift: 240,
            density: 1,
            glowIntensity: 0.4,
            saturation: 0.3,
            mouseRepulsion: true,
            repulsionStrength: 2,
            twinkleIntensity: 0.3,
            rotationSpeed: 0.05,
            speed: 1.0,
            transparent: true,
            mouseInteraction: true
        }, options);

        this.init();
    }

    init() {
        if (!window.ogl) {
            console.warn('OGL library not loaded.');
            return;
        }

        const { Renderer, Camera, Transform, Program, Mesh, Geometry, Vec3 } = window.ogl;
        
        // Setup Renderer
        this.renderer = new Renderer({ 
            alpha: this.options.transparent,
            dpr: window.devicePixelRatio || 1
        });
        this.gl = this.renderer.gl;
        
        this.canvas = this.gl.canvas;
        this.canvas.id = 'galaxy-canvas';
        
        if (!this.options.mouseInteraction) {
            this.canvas.style.pointerEvents = 'none';
        }
        
        document.body.insertBefore(this.canvas, document.body.firstChild);
        
        // Setup Camera
        this.camera = new Camera(this.gl, { fov: 45 });
        this.camera.position.z = 5;
        
        this.scene = new Transform();
        
        this.resize();
        window.addEventListener('resize', () => this.resize(), false);

        this.createParticles();
        
        this.mouse = new Vec3(0, 0, 0);
        if (this.options.mouseInteraction || this.options.mouseRepulsion) {
            window.addEventListener('mousemove', (e) => {
                this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
                this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            });
        }
        
        this.time = 0;
        requestAnimationFrame(this.update.bind(this));
    }
    
    resize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.perspective({ aspect: this.gl.canvas.width / this.gl.canvas.height });
    }
    
    createParticles() {
        const { Geometry, Program, Mesh } = window.ogl;
        
        const count = Math.floor(2000 * this.options.density);
        const position = new Float32Array(count * 3);
        const randoms = new Float32Array(count * 3);
        
        for (let i = 0; i < count; i++) {
            const r = Math.random() * 2 + 0.5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            
            position[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
            position[i * 3 + 1] = (Math.random() - 0.5) * 0.5; // Flatten galaxy
            position[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
            
            randoms[i * 3 + 0] = Math.random();
            randoms[i * 3 + 1] = Math.random();
            randoms[i * 3 + 2] = Math.random();
        }
        
        const geometry = new Geometry(this.gl, {
            position: { size: 3, data: position },
            randoms: { size: 3, data: randoms }
        });
        
        const vertex = `
            attribute vec3 position;
            attribute vec3 randoms;
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;
            uniform float uTime;
            uniform vec3 uMouse;
            uniform float uRepulsionStrength;
            
            varying vec3 vRandoms;
            
            void main() {
                vRandoms = randoms;
                
                vec3 pos = position;
                
                // Rotation
                float c = cos(uTime * 0.1);
                float s = sin(uTime * 0.1);
                mat2 rot = mat2(c, -s, s, c);
                pos.xz = rot * pos.xz;
                
                // Mouse repulsion
                float dist = distance(pos.xy, uMouse.xy * 3.0);
                if (dist < 1.0) {
                    pos.xy += normalize(pos.xy - uMouse.xy * 3.0) * (1.0 - dist) * uRepulsionStrength * 0.5;
                }
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = (randoms.x * 2.0 + 1.0) * (5.0 / gl_Position.w);
            }
        `;
        
        const fragment = `
            precision highp float;
            
            uniform float uTime;
            uniform float uHueShift;
            uniform float uGlowIntensity;
            uniform float uTwinkleIntensity;
            uniform float uSaturation;
            
            varying vec3 vRandoms;
            
            vec3 hsl2rgb(vec3 c) {
                vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0);
                return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
            }
            
            void main() {
                vec2 center = gl_PointCoord - 0.5;
                float dist = length(center);
                if (dist > 0.5) discard;
                
                float alpha = (0.5 - dist) * 2.0;
                
                // Twinkle
                float twinkle = sin(uTime * 2.0 + vRandoms.y * 10.0) * 0.5 + 0.5;
                alpha *= mix(1.0, twinkle, uTwinkleIntensity);
                
                vec3 color = hsl2rgb(vec3(
                    uHueShift / 360.0 + vRandoms.z * 0.1,
                    uSaturation,
                    0.6
                ));
                
                gl_FragColor = vec4(color * uGlowIntensity, alpha);
            }
        `;
        
        this.program = new Program(this.gl, {
            vertex,
            fragment,
            transparent: true,
            depthTest: false,
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: this.mouse },
                uRepulsionStrength: { value: this.options.repulsionStrength },
                uHueShift: { value: this.options.hueShift },
                uGlowIntensity: { value: this.options.glowIntensity },
                uTwinkleIntensity: { value: this.options.twinkleIntensity },
                uSaturation: { value: this.options.saturation }
            }
        });
        
        this.particles = new Mesh(this.gl, { mode: this.gl.POINTS, geometry, program: this.program });
        this.particles.setParent(this.scene);
    }
    
    update(t) {
        requestAnimationFrame(this.update.bind(this));
        
        this.time += 0.01 * this.options.speed;
        
        if (this.program) {
            this.program.uniforms.uTime.value = this.time;
            if (this.options.mouseRepulsion) {
                this.program.uniforms.uMouse.value.copy(this.mouse);
            }
        }
        
        this.scene.rotation.y += this.options.rotationSpeed * 0.01 * this.options.speed;
        
        this.renderer.render({ scene: this.scene, camera: this.camera });
    }
}
window.GalaxyBackground = GalaxyBackground;
