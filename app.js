// ============================================
//   kryptos ARKA - Site Logic
//   ※商品はBASEで管理するため、このファイルは
//   ローディング画面の制御のみを行っています。
// ============================================

window.addEventListener('load', () => {
    // サイトの読み込みが完了したら、2秒後にローディング画面を消す
    setTimeout(() => { 
        document.body.classList.add('loaded'); 
    }, 2000);
});
