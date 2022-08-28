export const title = document.getElementById('title') as HTMLElement;
if (title === undefined) throw new Error("cannot find HTMLElement with id = 'title'");

export const ui = document.getElementById('ui') as HTMLElement;
if (ui === undefined) throw new Error("cannot find HTMLElement with id = 'ui'");