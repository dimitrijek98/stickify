export const trimLineBreaks = (term: string) => {
  return term.replace(/(\r\n|\n|\r)/gm, ' ');
};
