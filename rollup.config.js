/* eslint-disable import/no-anonymous-default-export */
import resolve from 'rollup-plugin-node-resolve';

export default [
    {
        // By building from distribution file, we can avoid
        //   some fragility, since the only based-in dep. now
        //   is popper.js
        input: 'node_modules/tippy.js/esm/index.all.js',
        output: {
            format: 'esm',
            file: 'external/tippy.js'
        },
        plugins: [resolve()]
    }
];
