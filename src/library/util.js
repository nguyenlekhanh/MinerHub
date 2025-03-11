export function generateUniqueKey(length = 50) {
      
   const timestamp = Date.now().toString(36);
   
   const randomValues = new Uint8Array(length); 
   window.crypto.getRandomValues(randomValues);

   const randomString = Array.from(randomValues)
                              .map(b => b.toString(36))
                              .join('');
   const key = timestamp + randomString;

   return key.substring(0, length);

}      