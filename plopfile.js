
const workspaces = ["packages", "packages/utilities", "packages/components", "packages/core"];

/**
 * @param {import("plop").NodePlopAPI} plop
 */
module.exports = function (plop) {
    plop.setGenerator("package", {
        description: "Generates a package",
        prompts: [
            {
                type: "input",
                name: "packageName",
                message: "Enter package name:",
            }, {
                type: "input",
                name: "description",
                message: "The description of this package:",
            }, {
                type: "list",
                name: "outDir",
                message: "where should this package live?",
                default: "packages",
                choices: workspaces,
            }
        ],
        actions: (answers) => {
            const actions = [];

            if (!answers) {
                return actions
            }

            const { packageName, description, outDir } = answers

            actions.push({
                type: "addMany",
                templateFiles: "plop/package-template/**",
                destination: `./{{outDir}}/{{dashCase packageName}}`,
                base: "plop/package-template",
                data: { description, packageName, outDir },
                abortOnFail: true,
            })

            return actions
        }
    })
}