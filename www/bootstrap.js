init();

async function init() {
    const [{Chart, euler, runge_kutta}, {main, setup}] = await Promise.all([
        import("../pkg/dover.js"),
        import("./index.js"),
    ]);

    setup(Chart, euler, runge_kutta);
    main();
}