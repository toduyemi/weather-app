export function getElement<
  ElConstuctor extends new (...params: any[]) => HTMLElement,
>(selector: string, type: ElConstuctor): InstanceType<ElConstuctor> {
  const el = document.querySelector<InstanceType<ElConstuctor>>(selector);

  if (!(el instanceof type)) {
    throw new Error('Element does not exist');
  }
  return el;
}
