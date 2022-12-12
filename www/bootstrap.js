init();

async function init() {
    const [{Chart}, {main, setup}] = await Promise.all([
        import("../pkg/dover.js"),
        import("./index.js"),
    ]);

    setup(Chart);
    main();
}