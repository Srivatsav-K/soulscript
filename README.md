# Project info

## Installing dependencies

- `pnpm i`

### Install a package in a workspace

- `pnpm add <package> --filter <workspace>`

### Remove a package from a workspace

- `pnpm uninstall <package> --filter <workspace>`

### Upgrade a package in a workspace

- `pnpm update <package> --filter <workspace>`

### Link local packages

- `pnpm add <package>@workspace --filter <workspace>`
- `pnpm add --save-dev <package>@workspace --filter <workspace>`
