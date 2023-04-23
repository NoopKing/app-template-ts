import request from "request"

const ultilsCC = {
  "validateBin" : function (data) {

    return data.permitted.includes(data.bin)
  },
  "validate": async function (cc) {



    function chkCC(cc) {
      let r = false;
      cc += "";
      let bl = isdiv(cc.length, 2);
      let ctd = 0;

      for (let i = 1; i <= cc.length; i++) {
        let cdg = midS(cc, i, 1);

        if (isdiv(i, 2) != bl) {
          cdg *= 2;
          if (cdg > 9) cdg -= 9;
        }

        ctd += cdg * 1.0;
      }

      if (isdiv(ctd, 10)) r = true;
      return r;
    }

    function midS(aS, n, n2) {
      aS += "";
      let rS = "";

      if (n2 == null || n2 == "")
        n2 = aS.length;

      n *= 1;
      n2 *= 1;
      if (n < 0) n++;

      rS = aS.substring(n - 1, n - 1 + n2);
      return rS;
    }

    function isdiv(a, b) {
      if (b == null) b = 2;

      a *= 1.0;
      b *= 1.0;

      let r = false;

      if (a / b == Math.floor(a / b))
        r = true;

      return r;
    }
    return await cc && cc.length > 6 ? chkCC(cc.slice(0, 16)): false

  },
  "destructCC": function (cc) {
    try {
      cc = cc.replace(/ /g, "")
      cc.includes("/") ? cc = cc.replace(/\//g, "|"): false;
      cc = cc.split("|")
      cc[2].length == 2 ? cc[2] = "20"+cc[2]: null;
      return {
        numberCC: cc[0],
        monthCC: cc[1],
        yearCC: cc[2],
        cvvCC: cc[3],
      }
    } catch (e) {
      return null
    }
  }
}

export default ultilsCC