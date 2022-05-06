export function simpleNumber(costOfIt, visualOfIt) {
        var visualOfIt = costOfIt.toString();
      
        var visualLeng = 6;
        var maxLeng = 4;
        var letterArrayIndex = 0;
      
        var letterArray = [" Thousand", " Million", " Billion", " Trillion", " Quadrillion", " Quintillion", " Sextillion", " Septillion", " Octillion", " Nonillion", " Decillion", " Undecillion", " Duodecillion", " Tredecillion", " Quatuordecillion", " Quindecillion", " Sexdecillion", " Septendecillion", " Octodecillion", " Novemdecillion", " Vigintillion", " Unvigintillion", " Duovigintillion", " Tresvigintillion", " Quatuorvigintillion", " Quinquavigintillion", " Sesvigintillion", " Septemvigintillion", " Octovigintillion", " Novemvigintillion", " Trigintillion", " Untrigintillion", " Duotrigintillion", " Trestrigintillion", " Quatuortrigintillion", " Quinquatrigintillion", " Sestrigintillion", " Septentrigintillion", " Octotrigintillion", " Novemtrigintillion", " Quadragintillion", " Unquadragintillion", " Duoquadragintillion", " Tresquadragintillion", " Quatuorquadragintillion", " Quinquaquadragintillion", " Sesquadragintillion", " Septemquadragintillion", " Octoquadragintillion", " Novemquadragintillion", " Quinquagintillion", " Unquinquagintillion", " Duoquinquagintillion", " Tresquinquagintillion", " Quatuorquinquagintillion", " Quinquaquinquagintillion", " Sesquinquagintillion", " Septenquinquagintillion", " Octoquinquagintillion", " Novemquinquagintillion", " Sexagintillion", " Unsexagintillion", " Duosexagintillion", " Tressexagintillion", " Quatuorsexagintillion", " Quinquasexagintillion", " Sexasexagintillion", " Septemsexagintillion", " Octosexagintillion", " Novemsexagintillion", " Septuagintillion", " Unseptuagintillion", " Duoseptuagintillion", " Tresseptuagintillion", " Quatuorseptuagintillion", " Quinquaseptuagintillion", " Sexaseptuagintillion", " Septenseptuagintillion", " Octoseptuagintillion", " Novemseptuagintillion", " Octogintillion", " Unoctogintillion", " Duooctogintillion", " Tresoctogintillion", " Quatuoroctogintillion", " Quinquaoctogintillion", " Sesoctogintillion", " Septemoctogintillion", " Octooctogintillion", " Novemoctogintillion", " Nonagintillion", " Unnonagintillion", " Duononagintillion", " Tresnonagintillion", " Quatuornonagintillion", " Quinquanonagintillion", " Sesnonagintillion", " Septemnonagintillion", " Octononagintillion", " Novemnonagintillion", " Centillion", " Uncentillion"];
      
        var leng = 4;
        var slic = 1;
      
        for (var g = 0; g < visualOfIt.length; g++) {
            if (visualOfIt.length <= visualLeng) {
                if (leng < maxLeng) {
                    leng = maxLeng;
                }
      
                if (visualOfIt.length === leng) {
                    if (slic > 2) {
                        visualOfIt = costOfIt.toString().slice(0, slic) + letterArray[letterArrayIndex];
                        break;
                    } else {
                        visualOfIt = costOfIt.toString().slice(0, slic) + "," + costOfIt.toString().slice(slic, 3) + letterArray[letterArrayIndex];
                        break;
                    }
                } else {
                    leng++;
                    slic++;
                }
            } else {
                maxLeng += 3;
                visualLeng += 3;
                letterArrayIndex++;
            }
        }
      
        return visualOfIt;
      }