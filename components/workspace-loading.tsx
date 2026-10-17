export function WorkspaceLoading() {
 return <div className="elart-workspace elart-loading-screen">
  <aside className="elart-sidebar elart-loading-sidebar"><div className="elart-skeleton" style={{height:55,width:'75%',marginBottom:55}}/>{[1,2,3,4,5].map(n=><div key={n} className="elart-skeleton" style={{height:38,marginBottom:12}}/>)}</aside>
  <main className="elart-content" aria-label="Cargando" aria-busy="true"><div className="elart-skeleton" style={{height:22,width:185}}/><div className="elart-skeleton" style={{height:52,width:'50%',marginTop:20,marginBottom:36}}/><div className="elart-overview">{[1,2,3].map(n=><div key={n} className="elart-skeleton" style={{height:150}}/>)}</div><div className="elart-skeleton" style={{height:165,marginTop:25}}/><p className="elart-loading-caption">Cargando tu espacio de aprendizaje…</p></main>
 </div>;
}
