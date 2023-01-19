// Verhindert, das Nutzer nach String, welcher nur aus Leerzeichen besteht, suchen können
export function isVariableOnlySpaces(string) {
  return string.trim().length === 0;
}
