<script lang="ts" setup>

</script>

<template>
    <div class="page">
        <h1 class="title">Harry Potter</h1>
        <p class="subtitle">May the force be with you</p>
        <Particles
            id="tsparticles"
            :options="{
                // background: {
                //     color: {
                //         value: '#1F2329'
                //     }
                // },
                fpsLimit: 60,
                interactivity: {
                    detectsOn: 'window',
                    events: {
                        onClick: {
                            enable: true,
                            mode: 'push'
                        },
                        onHover: {
                            enable: true,
                            mode: 'repulse'
                        },
                        resize: true
                    },
                    modes: {
                        bubble: {
                            distance: 400,
                            duration: 2,
                            opacity: 0.8,
                            size: 40,
                            speed: 3
                        },
                        push: {
                            quantity: 4
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        }
                    }
                },
                particles: {
                    color: {
                        value: '#ffffff'
                    },
                    links: {
                        color: '#ffffff',
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1
                    },
                    collisions: {
                        enable: true
                    },
                    move: {
                        direction: 'none',
                        enable: true,
                        outMode: 'bounce',
                        random: false,
                        speed: 6,
                        straight: false
                    },
                    number: {
                        density: {
                            enable: true,
                            value_area: 800
                        },
                        value: 80
                    },
                    opacity: {
                        value: 0.5
                    },
                    shape: {
                        type: 'circle'
                    },
                    size: {
                        random: true,
                        value: 5
                    }
                },
                detectRetina: true
            }"
        />
    </div>
</template>

<style lang="scss" scoped>

div.page {
    position: relative;
    z-index: 0;

    background: url('@/assets/img/cover.jpeg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    &::before {
        content: '';

        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

        background-color: var(--bg-primary);
        opacity: 0.25;
        z-index: -1;
    }
}

</style>

<style lang="scss" scoped>

div.page {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

   h1.title {
        font-size: 128px;
    }

    p.subtitle {
        font-size: 20px;
        color: var(--text-primary);
        opacity: 0.5;
    }

    #tsparticles {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
}

</style>
