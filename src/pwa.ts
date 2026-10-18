export async function registerOffline(notice:(message:string)=>void):Promise<void>{
  if(!import.meta.env.PROD||!('serviceWorker'in navigator))return;
  try{
    const registration=await navigator.serviceWorker.register(import.meta.env.BASE_URL+'sw.js',{scope:import.meta.env.BASE_URL});
    const inspect=()=>{const worker=registration.installing;worker?.addEventListener('statechange',()=>{if(worker.state==='installed')notice(navigator.serviceWorker.controller?'Eine neue Version ist bereit. Schließe alle Spielfenster und öffne das Spiel erneut.':'Das Spiel ist jetzt auch offline verfügbar.');});};
    inspect();registration.addEventListener('updatefound',inspect);
    if(registration.waiting)notice('Eine neue Version wartet. Schließe alle Spielfenster, um sie zu übernehmen.');
  }catch{notice('Offline-Installation gerade nicht möglich. Online kannst du weiterspielen.');}
}
