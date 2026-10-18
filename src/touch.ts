import { InputBuffer } from './input';
export function installTouch(element:HTMLElement,input:InputBuffer,active:()=>boolean):()=>void{
  const pointers=new Map<number,string>();
  const clear=()=>{pointers.clear();input.clear();element.querySelectorAll('.held').forEach(e=>e.classList.remove('held'));};
  element.addEventListener('pointerdown',event=>{
    const button=(event.target as HTMLElement).closest<HTMLButtonElement>('[data-key]');
    if(!button||!active())return;
    event.preventDefault();button.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId,button.dataset.key!);button.classList.add('held');input.down(button.dataset.key!,false,performance.now());
  });
  const release=(event:PointerEvent)=>{
    const key=pointers.get(event.pointerId);if(!key)return;
    pointers.delete(event.pointerId);if(![...pointers.values()].includes(key)){input.up(key);element.querySelector(`[data-key="${key}"]`)?.classList.remove('held');}
  };
  element.addEventListener('pointerup',release);
  element.addEventListener('lostpointercapture',release);
  element.addEventListener('pointercancel',()=>{clear();window.dispatchEvent(new Event('game-interrupt'));});
  return clear;
}
