<template>
  <div>
    <v-checkbox
      v-model="isExtended"
      :label="$t('tips.extended')"></v-checkbox>
    <v-expansion-panel>
      <template v-for="(tip, tipIndex) in tips">
        <v-expansion-panel-content v-if="check(tip)" :key="tipIndex">
          <div slot="header">{{ tip.title }}</div>
          <v-card>
            <v-card-text>
              <template v-for="(subTip, subTipIndex) in tip.items">
                <template v-if="check(subTip)">
                  <template v-if="!subTip.items">
                    <v-chip
                      :key="subTipIndex"
                      class="mb-3"
                      @click="onTipClicked(subTip.dataInsert, subTip.offset)">
                      <span>{{ subTip.title }}</span>
                    </v-chip>
                  </template>
                  <template v-else>
                    <v-expansion-panel :key="subTipIndex">
                      <v-expansion-panel-content
                        :class="{ 'inner-tip__container': tip.items.length != subTipIndex + 1 }">
                        <div slot="header">{{ subTip.title }}</div>
                        <v-card>
                          <v-card-text>
                            <template v-for="(subSubTip, subSubTipIndex) in subTip.items">
                              <v-chip
                                v-if="check(subSubTip)"
                                :key="subSubTipIndex"
                                class="mb-3"
                                @click="onTipClicked(subSubTip.dataInsert, subSubTip.offset)">
                                <span>{{ subSubTip.title }}</span>
                              </v-chip>
                            </template>
                          </v-card-text>
                        </v-card>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </template>
                </template>
              </template>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </template>
    </v-expansion-panel>
  </div>
</template>

<script>
export default {
  props: {
    exerciseId: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      isExtended: false
    };
  },
  computed: {
    tips() {
      return [
        {
          title: 'Space R64[x,y,z,t]',
          items: [
            { title: '$\\mathbb{Z}$', dataInsert: 'SPACE = Z[];', offset: 10 },
            { title: '$\\mathbb{Z}p$', dataInsert: 'SPACE = Zp[];', offset: 11, extended: true },
            { title: '$\\mathbb{Z}p32$', dataInsert: 'SPACE = Zp32[];', offset: 13, extended: true },
            { title: '$\\mathbb{Z}64$', dataInsert: 'SPACE = Z64[];', offset: 12, extended: true },
            { title: '$\\mathbb{Q}$', dataInsert: 'SPACE = Q[];', offset: 10 },
            { title: '$\\mathbb{R}$', dataInsert: 'SPACE = R[];', offset: 10, extended: true },
            { title: '$\\mathbb{R}64$', dataInsert: 'SPACE = R64[];', offset: 13 },
            { title: '$\\mathbb{R}128$', dataInsert: 'SPACE = R128[];', offset: 13, extended: true },
            { title: '$\\mathbb{C}$', dataInsert: 'SPACE = C[];', offset: 10, extended: true },
            { title: '$\\mathbb{C}64$', dataInsert: 'SPACE = C64[];', offset: 12 },
            { title: '$\\mathbb{C}128$', dataInsert: 'SPACE = C128[];', offset: 13, extended: true },
            { title: '$\\mathbb{CZ}$', dataInsert: 'SPACE = CZ[];', offset: 11, extended: true },
            { title: '$\\mathbb{CZ}p$', dataInsert: 'SPACE = CZp[];', offset: 12, extended: true },
            { title: '$\\mathbb{CZ}p32$', dataInsert: 'SPACE = CZp32[];', offset: 14, extended: true },
            { title: '$\\mathbb{CZ}64$', dataInsert: 'SPACE = CZ64[];', offset: 13, extended: true },
            { title: '$\\mathbb{CQ}$', dataInsert: 'SPACE = CQ[];', offset: 11, extended: true },
            {
              title: this.$t('tips.constants'),
              extended: true,
              items: [
                { title: 'FLOATPOS', dataInsert: 'FLOATPOS = ;' },
                { title: 'MachineEpsilonR64', dataInsert: 'MachineEpsilonR64 = ;' },
                { title: 'MachineEpsilonR', dataInsert: 'MachineEpsilonR = ;' },
                { title: 'MachineEpsilonR/Accuracy', dataInsert: 'MachineEpsilonR = / ;' },
                { title: 'MOD', dataInsert: 'MOD = ;' },
                { title: 'MOD32', dataInsert: 'MOD32 = ;' },
                { title: 'RADIAN', dataInsert: 'RADIAN = ;' },
                { title: 'STEPBYSTEP', dataInsert: 'STEPBYSTEP = ;' },
                { title: 'EXPAND', dataInsert: 'EXPAND = ;' },
                { title: 'SUBSTITUTION', dataInsert: 'SUBSTITUTION = ;' },
                { title: 'TIMEOUT', dataInsert: 'TIMEOUT = ;' },
              ],
            },
          ],
        },
        {
          title: this.$t('tips.symbols'),
          items: [
            {
              title: this.$t('tips.numbersSetsIntequality'),
              items: [
                { title: '$i$', dataInsert: '\\i' },
                { title: '$e$', dataInsert: '\\e' },
                { title: '$\\pi$', dataInsert: '\\pi' },
                { title: '$\\infty$', dataInsert: '\\infty' },
                { title: '$\\emptyset$', dataInsert: '\\emptyset' },
                { title: '$\\cup$', dataInsert: '\\cup' },
                { title: '$\\setminus$', dataInsert: '\\setminus' },
                { title: '$\\triangle$', dataInsert: '\\triangle' },
                { title: '$\'$', dataInsert: '\'' },
                { title: '$\\cap$', dataInsert: '\\cap' },
                { title: '$(a,b)$', dataInsert: '\\(,\\)' },
                { title: '$[a,b]$', dataInsert: '\\[,\\]' },
                { title: '$(a,b]$', dataInsert: '\\(,\\]' },
                { title: '$[a,b)$', dataInsert: '\\[,\\)' },
                { title: '$\\ge$', dataInsert: '\\ge' },
                { title: '$\\ne$', dataInsert: '\\ne' },
                { title: '$=$', dataInsert: '==' },
                { title: '$\\le$', dataInsert: '\\le' },
                { title: '$\\lor$', dataInsert: '\\lor' },
                { title: '$\\&$', dataInsert: '\\&' },
                { title: '$\\neg$', dataInsert: '\\neg' },
                { title: '$\\Leftrightarrow$', dataInsert: '\\Leftrightarrow' },
                { title: '$\\implies$', dataInsert: '\\implies' }
              ],
            },
            {
              title: this.$t('tips.otherSymbols'),
              items: [
                { title: '$\\circ$', dataInsert: '\\circ' },
                { title: '$\\partial$', dataInsert: '\\partial' },
                { title: '$\\nabla$', dataInsert: '\\nabla' },
                { title: '$\\hbar$', dataInsert: '\\hbar' },
                { title: '$\\to$', dataInsert: '\\to' },
                { title: '$\\perp$', dataInsert: '\\perp' },
                { title: '$\\parallel$', dataInsert: '\\parallel' },
                { title: '$\\angle$', dataInsert: '\\angle' },
                { title: '$\\smile$', dataInsert: '\\smile' },
                { title: '$\\equiv$', dataInsert: '\\equiv' },
                { title: '$\\square$', dataInsert: '\\square' },
                { title: '$\\blacksquare$', dataInsert: '\\blacksquare' },
                { title: '$\\approx$', dataInsert: '\\approx' },
                { title: '$\\sim$', dataInsert: '\\sim' },
                { title: '$\\in$', dataInsert: '\\in' },
                { title: '$\\notin$', dataInsert: '\\notin' },
                { title: '$\\owns$', dataInsert: '\\owns' },
                { title: '$\\subset$', dataInsert: '\\subset' },
                { title: '$\\subseteq$', dataInsert: '\\subseteq' },
                { title: '$\\supset$', dataInsert: '\\supset' },
                { title: '$\\supseteq$', dataInsert: '\\supseteq' },
                { title: '$\\exists$', dataInsert: '\\exists' },
                { title: '$\\nexists$', dataInsert: '\\nexists' },
                { title: '$\\forall$', dataInsert: '\\forall' },
                { title: '$\\neg$', dataInsert: '\\neg' },
                { title: '$\\vee$', dataInsert: '\\vee' },
                { title: '$\\wedge$', dataInsert: '\\wedge' },
                { title: '$\\oplus$', dataInsert: '\\oplus' },
                { title: '$\\otimes$', dataInsert: '\\otimes' },
                { title: '$\\coprod$', dataInsert: '\\coprod' },
                { title: '$\\hat a$', dataInsert: '\\hat' },
                { title: '$\\bar a$', dataInsert: '\\bar' },
                { title: '$\\tilde a$', dataInsert: '\\tilde' },
                { title: '$\\vec a$', dataInsert: '\\vec ' },
                { title: '$\\dot a$', dataInsert: '\\dot ' },
                { title: '$\\ddot a$', dataInsert: '\\ddot' },
                { title: '$\\widetilde{az}$', dataInsert: '\\widetilde{}' },
                { title: '$\\widehat{az}$', dataInsert: '\\widehat{}' },
                { title: '$\\overline{az}$', dataInsert: '\\overline{}' },
                { title: '$\\overrightarrow{az}$', dataInsert: '\\overrightarrow{}' },
                { title: '$\\underbrace{az}$', dataInsert: '\\underbrace{}' },
                { title: '$\\overbrace{az}$', dataInsert: '\\overbrace{}' },
                { title: '$\\frac{a}{b}$', dataInsert: '\\frac{}{}' },
                { title: '$\\{$', dataInsert: '\\system(,)' },
                { title: '$[$', dataInsert: '\\systemOR(,)' },
                { title: '$\\longleftrightarrow$', dataInsert: '\\longleftrightarrow' },
                { title: '$\\longleftarrow$', dataInsert: '\\longleftarrow' },
                { title: '$\\uparrow$', dataInsert: '\\uparrow' },
                { title: '$\\longrightarrow$', dataInsert: '\\longrightarrow' },
                { title: '$\\downarrow$', dataInsert: '\\downarrow' }
              ],
            },
            {
              title: this.$t('tips.greekLowercase'),
              items: [
                { title: '$\\circ$', dataInsert: '\\alpha' },
                { title: '$\\beta$', dataInsert: '\\beta' },
                { title: '$\\gamma$', dataInsert: '\\gamma' },
                { title: '$\\delta$', dataInsert: '\\delta' },
                { title: '$\\epsilon$', dataInsert: '\\epsilon' },
                { title: '$\\varepsilon$', dataInsert: '\\varepsilon' },
                { title: '$\\zeta$', dataInsert: '\\zeta' },
                { title: '$\\eta$', dataInsert: '\\eta' },
                { title: '$\\theta$', dataInsert: '\\theta' },
                { title: '$\\vartheta$', dataInsert: '\\vartheta' },
                { title: '$\\iota$', dataInsert: '\\iota' },
                { title: '$\\kappa$', dataInsert: '\\kappa' },
                { title: '$\\varkappa$', dataInsert: '\\varkappa' },
                { title: '$\\lambda$', dataInsert: '\\lambda' },
                { title: '$\\mu$', dataInsert: '\\mu' },
                { title: '$\\nu$', dataInsert: '\\nu' },
                { title: '$\\xi$', dataInsert: '\\xi' },
                { title: '$\\pi$', dataInsert: '\\pi' },
                { title: '$\\varpi$', dataInsert: '\\varpi' },
                { title: '$\\rho$', dataInsert: '\\rho' },
                { title: '$\\varrho$', dataInsert: '\\varrho' },
                { title: '$\\sigma$', dataInsert: '\\sigma' },
                { title: '$\\varsigma$', dataInsert: '\\varsigma' },
                { title: '$\\tau$', dataInsert: '\\tau' },
                { title: '$\\upsilon$', dataInsert: '\\upsilon' },
                { title: '$\\phi$', dataInsert: '\\phi' },
                { title: '$\\varphi$', dataInsert: '\\varphi' },
                { title: '$\\chi$', dataInsert: '\\chi' },
                { title: '$\\psi$', dataInsert: '\\psi' },
                { title: '$\\omega$', dataInsert: '\\omega' }
              ]
            },
            {
              title: this.$t('tips.greekUppercase'),
              items: [
                { title: '$\\Gamma$', dataInsert: '\\Gamma' },
                { title: '$\\Delta$', dataInsert: '\\Delta' },
                { title: '$\\Theta$', dataInsert: '\\Theta' },
                { title: '$\\Lambda$', dataInsert: '\\Lambda' },
                { title: '$\\Xi$', dataInsert: '\\Xi' },
                { title: '$\\Pi$', dataInsert: '\\Pi' },
                { title: '$\\Sigma$', dataInsert: '\\Sigma' },
                { title: '$\\Upsilon$', dataInsert: '\\Upsilon' },
                { title: '$\\Phi$', dataInsert: '\\Phi' },
                { title: '$\\Psi$', dataInsert: '\\Psi' },
                { title: '$\\Omega$', dataInsert: '\\Omega' }
              ]
            }
          ],
        },
        {
          title: this.$t('tips.numbersPolynomials'),
          items: [
            {
              title: this.$t('tips.numbers'),
              items: [
                { title: 'max(a,b)', dataInsert: '\\max(,)', offset: 5 },
                { title: 'min(a,b)', dataInsert: '\\min(,)', offset: 5 },
                { title: 'abs()', dataInsert: '\\abs()', offset: 5 },
                { title: 'sign()', dataInsert: '\\sign()', offset: 6 },
                { title: 'round()', dataInsert: '\\round()', offset: 7 },
                { title: 'floor()', dataInsert: '\\floor()', offset: 7 },
                { title: 'ceil()', dataInsert: '\\ceil()', offset: 6 },
                { title: 'isZero()', dataInsert: '\\isZero()', offset: 8 },
                { title: 'isOne()', dataInsert: '\\isOne()', offset: 7 },
                { title: 'isEven()', dataInsert: '\\isEven()', offset: 8 },
                { title: 'isNegative()', dataInsert: '\\isNegative()', offset: 12 },
                { title: 'isInfinite()', dataInsert: '\\isInfinite()', offset: 12 },
                { title: 'random(bits)', dataInsert: '\\SPACE=Z[x,y];\\randomNumber();', offset: 28 },
              ]
            },
            {
              title: this.$t('tips.integers'),
              items: [
                { title: 'div(a,b)', dataInsert: '\\div(,)', offset: 5 },
                { title: 'rem(a,b)', dataInsert: '\\rem(,)', offset: 5 },
                { title: 'divRem(a,b)', dataInsert: '\\divRem(,)', offset: 8 },
                { title: 'mod(a,m)', dataInsert: '\\mod(,)', offset: 5 },
                { title: 'Mod(a,m)', dataInsert: '\\Mod(,)', offset: 5 },
                { title: 'factor(a)', dataInsert: '\\factor()', offset: 8 },
                { title: 'a!', dataInsert: '\\a!', offset: 2 },
                { title: 'GCD(a,b)', dataInsert: '\\GCD(,)', offset: 5 },
                { title: 'extendedGCD(a,b)', dataInsert: '\\extendedGCD(,)', offset: 13 },
                { title: 'modInverse(a,m)', dataInsert: '\\modInverse(,)', offset: 12 }
              ]
            },
            {
              title: this.$t('tips.fractionsAndRationalFunctions'),
              items: [
                { title: 'num(fr)', dataInsert: '\\num()', offset: 5 },
                { title: 'denom(fr)', dataInsert: '\\denom()', offset: 7 },
                { title: 'cancel(fr)', dataInsert: '\\cancel()', offset: 8 },
                { title: 'quotientAndRemainder(fr)', dataInsert: '\\quotientAndRemainder()', offset: 22 },
                { title: 'quotient(fr)', dataInsert: '\\quotient()', offset: 10 },
                { title: 'remainder(fr)', dataInsert: '\\remainder()', offset: 11 },
                { title: 'quotientAndRemainder(fr,x)', dataInsert: '\\quotientAndRemainder(,)', offset: 22 },
                { title: 'quotient(fr,x)', dataInsert: '\\quotient(,)', offset: 10 },
                { title: 'remainder(fr,x)', dataInsert: '\\remainder(,)', offset: 11 },
                { title: 'properForm(fr)', dataInsert: '\\properForm();', offset: 12 }
              ]
            },
            {
              title: this.$t('tips.polynomials'),
              items: [
                { title: 'random(d_1,..,d_n,density,bits)', dataInsert: '\\SPACE=Z[x,y];\\randomPolynom(2, 2, 100, 5);' },
                { title: 'GCD(f,g)', dataInsert: '\\GCD(,);', offset: 5 },
                { title: 'LCM(f,g)', dataInsert: '\\LCM(,);', offset: 5 },
                { title: 'leadingCoeff()', dataInsert: '\\leadingCoeff();', offset: 14 },
                { title: 'value(f(x),[a])', dataInsert: '\\value(,[]);', offset: 7 },
                { title: 'value(f(x,y), [a, b])', dataInsert: '\\value(,[,]);', offset: 7 },
                { title: 'rootsOfPolynomial()', dataInsert: '\\SPACE = Q[x];b = \\solve(x^2 + 3x - 6 = 0);' },
                { title: 'realRootsOfPolynomial()', dataInsert: '\\SPACE = R64[x];b = \\solve(x^3+8);' },
                { title: 'complexRootsOfPolynomial()', dataInsert: '\\SPACE = C64[x];b = \\solve(x^3+8);' },
                { title: 'solveNAE(f,g,...,h)', dataInsert: '\\SPACE = R64[x, y]; \\solveNAE(x^2 + y^2 - 4, y - x^2);' },
                { title: '\\degrees(f)', dataInsert: '\\degrees();', offset: 9 },
                { title: '\\degree(f)', dataInsert: '\\degree();', offset: 8 },
                { title: 'groebner(f,..,g)', dataInsert: '\\SPACE = Z[x, y, z]; \\groebner(x^4y^3 + 2xy^2 + 3x + 1, x^3y^2 + x^2, x^4y + z^2 + xy^4 + 3);' },
                { title: 'reduceByGB(f,[p,..,q])', dataInsert: '\\SPACE = Q[x, y, z]; \\reduceByGB(5y^2 + 3x^2 + z^2, [y + x, 5z^2 + 5z]);' },
                { title: 'PRS(a,b)', dataInsert: '\\PRS(,)', offset: 5 },
                { title: 'GCDNumCf(p)', dataInsert: '\\GCDNumPolCoeffs()', offset: 17 },
                { title: 'GCDHCf(p,z)', dataInsert: '\\GCDHPolCoeffs()', offset: 15 },
                { title: 'quotientAndRemainder(a,b,x)', dataInsert: '\\quotientAndRemainder(,,)', offset: 22 },
                { title: 'quotient(a,b,x)', dataInsert: '\\quotient(,,)', offset: 10 },
                { title: 'remainder(a,b,x)', dataInsert: '\\remainder(,,)', offset: 11 },
                { title: 'extendedGCD(a,b)', dataInsert: '\\SPACE=Q[x,y]; a=3xy+1; b=4y+x;V=\\extendedGCD(a,b); v=\\elementOf(V); c= a v_{2}+b v_{3}; \\print(c, v_{1},v_{2}, v_{3});' },
                { title: 'toVectorDence(p)', dataInsert: '\\toVectorDence();', offset: 15 },
                { title: 'toVectorSparce(p)', dataInsert: '\\toVectorSparce();', offset: 16 },
                { title: 'vectorToPolynom([])', dataInsert: '\\vectorToPolynom();', offset: 17 },
              ]
            }
          ]
        },
        {
          title: this.$t('tips.matrices'),
          extended: true,
          items: [
            {
              title: this.$t('tips.matricesAndLinearSystem'),
              items: [
                { title: 'solveLAE', dataInsert: 'M=[[1,2],[3,1]]; b=[1,1]; \\solve(M,b);' },
                { title: 'transpose', dataInsert: '^{T};' },
                { title: 'inverse', dataInsert: '^{-1};' },
                { title: 'adjoint', dataInsert: '\\adjoint();' },
                { title: 'det', dataInsert: '\\det();' },
                { title: 'detL', dataInsert: '\\detL(n,[p(x,y),x,q(x,y),y]);' },
                { title: 'conjugate', dataInsert: '^{\\ast};' },
                { title: 'genInverse', dataInsert: '^{+};' },
                { title: 'toEchelonForm', dataInsert: '\\toEchelonForm();' },
                { title: 'kernel', dataInsert: '\\kernel();' },
                { title: 'charPolynom', dataInsert: '\\charPolynom();' },
                { title: 'LDU', dataInsert: '\\LDU();' },
                { title: 'BruhatDecomposition', dataInsert: '\\BruhatDecomposition();' },
                { title: 'random(n,m,density,bits)', dataInsert: '\\SPACE=Z[x,y]; \\randomMatrix(2, 2, 100, 5);' },
                { title: 'random(n,m,dens,d1,.,dk,dens,bits)', dataInsert: '\\SPACE=Z[x,y,z]; \\randomMatrix(2, 2, 100, 1,1,1,50, 5);' },
                { title: 'submatrix(M,r1,Nr,c1,Nc)', dataInsert: '\\submatrix(A,1,1,1,1);', offset: 12 }
              ]
            },
            {
              title: this.$t('tips.matricesOverZ'),
              items: [
                { title: 'LDUm', dataInsert: '\\SPACE=Z[];  A=[[5,2],[3,2]]; \\LDUm(A);' },
                { title: 'PlduQwk', dataInsert: '\\SPACE=Z[]; \\PlduQwk();' },
                { title: 'LDUWK', dataInsert: '\\SPACE=Z[]; \\LDUWK();' },
                { title: 'WDK', dataInsert: '\\SPACE=Z[]; \\WDK();' }
              ]
            },
            {
              title: this.$t('tips.linearProgramming'),
              items: [
                { title: 'SimplexMax', dataInsert: '\\SPACE=Q[];A=[[1,3],[2,1]];b=[3,2];c=[8,6]; \\SimplexMax(A,b,c);' },
                { title: 'SimplexMin', dataInsert: '\\SPACE=Q[];A=[[3,4],[2,1]];b=[3,1];c=[-2,-1]; \\SimplexMin(A,b,c);' }
              ]
            }
          ]
        },
        {
          title: this.$t('tips.functions'),
          items: [
            {
              title: this.$t('tips.elementaryFunctions'),
              items: [
                { title: 'ln', dataInsert: '\\ln()', offset: 4 },
                { title: 'lg', dataInsert: '\\lg()', offset: 4 },
                { title: 'sin', dataInsert: '\\sin()', offset: 5 },
                { title: 'cos', dataInsert: '\\cos()', offset: 5 },
                { title: 'tg', dataInsert: '\\tg()', offset: 4 },
                { title: 'ctg', dataInsert: '\\ctg()', offset: 5 },
                { title: 'arcsin', dataInsert: '\\arcsin()', offset: 8 },
                { title: 'arccos', dataInsert: '\\arccos()', offset: 8 },
                { title: 'arctg', dataInsert: '\\arctg()', offset: 7 },
                { title: 'arcctg', dataInsert: '\\arcctg()', offset: 8 },
                { title: 'sh', dataInsert: '\\sh()', offset: 4 },
                { title: 'ch', dataInsert: '\\ch()', offset: 4 },
                { title: 'th', dataInsert: '\\th()', offset: 4 },
                { title: 'cth', dataInsert: '\\cth()', offset: 5 },
                { title: 'arcsh', dataInsert: '\\arcsh()', offset: 7 },
                { title: 'arcch', dataInsert: '\\arcch()', offset: 7 },
                { title: 'arcth', dataInsert: '\\arcth()', offset: 7 },
                { title: 'arccth', dataInsert: '\\arccth()', offset: 8 },
                { title: 'exp', dataInsert: '\\exp()', offset: 5 },
                { title: '$\\sqrt{}$', dataInsert: '\\sqrt()', offset: 6 }
              ]
            },
            {
              title: this.$t('tips.otherFunctions'),
              items: [
                { title: '$\\log_a(x)$', dataInsert: '\\log(a, x);' },
                { title: '$\\sqrt[n]{a}$', dataInsert: '\\rootOf(a, n);' },
                { title: '$\\int \\! f \\ \\mathrm{d}x$', dataInsert: '\\int(f) d x;' },
                { title: '$D(f)$', dataInsert: '\\D(f);' },
                { title: '$D_{x}(f)$', dataInsert: '\\D(f, x);' },
                { title: '$D_{x}^{(n)}(f)$', dataInsert: '\\D(f, x^n);' },
                { title: '$\\lim_{x \\to a}(f)$', dataInsert: '\\lim_{x \\to a}(f);' },
                { title: '$\\binom n k $', dataInsert: '\\binom(n, k);' },
                { title: 'abs', dataInsert: '\\abs()', offset: 5 },
                { title: 'sign', dataInsert: '\\sign()', offset: 6 },
                { title: 'a!', dataInsert: 'a!', offset: 1 },
                { title: '$\\Gamma(x)$', dataInsert: '\\Gamma()', extended: true },
                { title: '&Beta;(x,y)', dataInsert: '\\Beta(x, y);', extended: true },
                { title: 'BessJ(n,x)', dataInsert: '\\BesselJ(n,x);', extended: true },
                { title: 'BessY(n,x)', dataInsert: '\\BesselY(n,x);', extended: true },
                { title: 'LegP(n,x)', dataInsert: '\\LegendreP(n,x);', extended: true },
                { title: 'LegP(n,m,x)', dataInsert: '\\LegendreP(n,m,x);', extended: true },
                { title: 'sphHarm', dataInsert: '\\sphericalHarmonic(n,m,\\theta,\\phi);', extended: true },
                { title: 'sphHarmR', dataInsert: '\\sphericalHarmonicR(n,m,r,\\theta,\\phi);', extended: true },
                { title: 'sphHarmCart', dataInsert: '\\sphericalHarmonicCart(n,m,x,y,z);', extended: true },
                { title: 'sphHarmRCart', dataInsert: '\\sphericalHarmonicRCart(n,m,x,y,z);', extended: true }
              ]
            },
            {
              title: this.$t('tips.equationsInequalitiesAndSystems'),
              items: [
                { title: 'solveEquation', dataInsert: 'SPACE=Q[x]; \\solve(x^2+5x+p=0);' },
                { title: 'solveLinSyst', dataInsert: 'SPACE=Q[x,y]; \\solve([x+y=6,3x-2y=5]);' },
                { title: 'solveLSystWithOtherVars', dataInsert: '\\solve([a+b+c=6,3c*a-2b-7d=5],[a,b]);' },
                { title: 'solveLSystInMatrixForm', dataInsert: 'A=[[1,2],[4,5]]; b=[3,4]; \\solve(A,b);' },
                { title: 'solveNAE(f,g,...,h)', dataInsert: 'SPACE=R64[x,y]; \\solveNAE(x^2+y^2-4,y-x^2);' },
                { title: 'solveTrigonometricEquation', dataInsert: 'SPACE = R64[x];b = \\solveTrig(\\sin(x)=0.5);' },
                { title: 'solveInequality', dataInsert: '\\solve((x+1)^2(x-3)(x+5) > 0);' },
                { title: 'solveSystemOfInequalities', dataInsert: '\\solve(x^2+4x-5 > 0, x^2-2x-8 < 0);' },
                { title: 'value', dataInsert: 'SPACE=R64[x,y]; f=x^2-7y; \\value(f,[1,2]);' }
              ]
            },
            {
              title: this.$t('tips.differentialEquationsAndSystems'),
              extended: true,
              items: [
                { title: 'solveLinDE', dataInsert: 'SPACE=R64[t];\\newline  g=\\systLDE(\\d(y, t, 3)+3\\d(y, t, 2)+3\\d(y, t)+y=1);\\newline f=\\initCond(\\d(y, t, 0, 0)=0, \\d(y, t, 0, 1)=0,\\d(y, t, 0, 2)=0);\\newline h=\\solveLDE(g, f);' },
                { title: 'solveSystemOfLinDEs', dataInsert: 'SPACE=R64[t];\\newline g=\\systLDE(\\d(x, t)-y+z=0, -x-y+\\d(y, t)=0, -x-z+\\d(z, t)=0);\\newline f= \\initCond(\\d(x, t, 0, 0)=1, \\d(y, t, 0, 0)=2, \\d(z, t, 0, 0)=3);\\newline h= \\solveLDE(g, f);' }
              ]
            },
            {
              title: this.$t('tips.probabilityTheory'),
              extended: true,
              items: [
                { title: 'discreteRandomQuantity', dataInsert: 'SPACE=R64[x];DRQ=[[10,20,33,22],[0.1,0.5,0.2, 0.2]];' },
                { title: 'mathExpectation', dataInsert: '\\mathExpectation(DRQ);' },
                { title: 'dispersion', dataInsert: '\\dispersion(DRQ);' },
                { title: 'meanSquareDeviation', dataInsert: '\\meanSquareDeviation(DRQ);' },
                { title: 'addQU', dataInsert: '\\addQU(DRQ1,DRQM2);' },
                { title: 'multiplyQU', dataInsert: '\\multiplyQU(DRQ1, DRQ2);' },
                { title: 'covariance', dataInsert: '\\covariance(DRQ1, DRQ2);' },
                { title: 'correlation', dataInsert: '\\correlation(DRQ1, DRQ2);' },
                { title: 'plotPolygonDistribution', dataInsert: '\\plotPolygonDistribution(DRQ);' },
                { title: 'plotDistributionFunction', dataInsert: '\\plotDistributionFunction(DRQ);' },
                { title: 'simplifyQU', dataInsert: '\\simplifyQU(DRQ);' }
              ]
            },
            {
              title: this.$t('tips.statistics'),
              extended: true,
              items: [
                { title: 'sample', dataInsert: '\\SPACE=R64[x];S=[10,20,33,22];' },
                { title: 'sampleMean', dataInsert: '\\sampleMean(S);' },
                { title: 'sampleDispersion', dataInsert: '\\sampleDispersion(S);' },
                { title: 'covarianceCoefficient', dataInsert: '\\covarianceCoefficient(S1, S2);' },
                { title: 'correlationCoefficient', dataInsert: '\\correlationCoefficient(S1, S2);' }
              ]
            },
            {
              title: this.$t('tips.idempotentAlgebras'),
              extended: true,
              items: [
                { title: 'R64min+', dataInsert: 'SPACE = R64MinPlus[];', offset: 19 },
                { title: 'Rmin+', dataInsert: 'SPACE = RMinPlus[];', offset: 17 },
                { title: 'R64min$\\times$', dataInsert: 'SPACE = R64MinMult[];', offset: 19 },
                { title: 'Rmin$\\times$', dataInsert: 'SPACE = RMinMult[];', offset: 17 },
                { title: 'R64max+', dataInsert: 'SPACE = R64MaxPlus[];', offset: 19 },
                { title: 'Rmax+', dataInsert: 'SPACE = RMaxPlus[];', offset: 17 },
                { title: 'R64max$\\times$', dataInsert: 'SPACE = R64MaxMult[];', offset: 19 },
                { title: 'Rmax$\\times$', dataInsert: 'SPACE = RMaxMult[];', offset: 17 },
                { title: 'R64min max', dataInsert: 'SPACE = R64MinMax[];', offset: 18 },
                { title: 'Rmin max', dataInsert: 'SPACE = RMinMax[];', offset: 16 },
                { title: 'R64max min', dataInsert: 'SPACE = R64MaxMin[];', offset: 18 },
                { title: 'Rmax min', dataInsert: 'SPACE = RMaxMin[];', offset: 16 },
                { title: 'Zmin+', dataInsert: 'SPACE = ZMinPlus[];', offset: 17 },
                { title: 'Zmin$\\times$', dataInsert: 'SPACE = ZMinMult[];', offset: 17 },
                { title: 'Zmax+', dataInsert: 'SPACE = ZMaxPlus[];', offset: 17 },
                { title: 'Zmax$\\times$', dataInsert: 'SPACE = ZMaxMult[];', offset: 17 },
                { title: 'Zmin max', dataInsert: 'SPACE = ZMinMax[];', offset: 16 },
                { title: 'Zmax min', dataInsert: 'SPACE = ZMaxMin[];', offset: 16 },
                { title: 'Ax=b', dataInsert: 'SPACE = ZMinPlus[x, y]; A = [[1, 1],[2, 0]]; \\newline b = [10, 7]; \\newline \\solveLAETropic(A, b);' },
                { title: 'Ax ≤ b', dataInsert: 'SPACE = ZMinPlus[x, y];  A = [[1, 1],[2, 0]]; \\newline b = [10, 7]; \\newline \\solveLAITropic(A, b);' },
                { title: 'Ax+b=x', dataInsert: 'SPACE = R64MaxPlus[x, y];  A = [[0 , -2 ], [-\\infty, 0 ]];  b = [ 1 , -\\infty ]; \\newline \\BellmanEquation(A, b);' },
                { title: 'Ax+b≤x', dataInsert: 'SPACE = R64MaxPlus[x, y];  A = [[0 , -2 ], [-\\infty, 0 ]];  b = [ 1 , -\\infty ]; \\newline \\BellmanInequality(A, b);' }
              ]
            },
            {
              title: this.$t('tips.algebraicManipulations'),
              items: [
                { title: 'factor', dataInsert: '\\factor();', offset: 8 },
                { title: 'expand', dataInsert: '\\expand();', offset: 8 }
              ]
            },
            {
              title: this.$t('tips.transcendentalManipulations'),
              items: [
                { title: 'Factor', dataInsert: '\\Factor();', offset: 8 },
                { title: 'Expand', dataInsert: '\\Expand();', offset: 8 }
              ]
            }
          ]
        },
        {
          title: this.$t('tips.graphicsAndTables'),
          items: [
            {
              title: this.$t('tips.plots2DAndTables'),
              items: [
                { title: 'plot', dataInsert: '\\set2D(-5,5,-4,6); f=3\\arctg(x+1); \\plot([f,-x+5, 3x+5]);', offset: 57 },
                { title: 'paramPlot', dataInsert: '\\set2D(-20, 20, -20, 20);\\newline g = x\\sin(x); k = x\\cos(x);\\newline f = \\paramPlot([g, k], [0, 5\\pi]);', offset: 104 },
                { title: 'tablePlot', dataInsert: '\\set2D( 0, 10,  -5, 30);\\newline \\tablePlot([[0, 1, 2, 3, 4, 5],[0, 1, 4, 9, 16, 25],[0, -1, -2, -3, -4, -5],[0, 4, 8, 12, 16, 20]]);', offset: 133 },
                { title: 'showPlots', dataInsert: '\\set2D(-5, 5, -5, 5);\\newline f1 = \\plot(\\tg(x));\\newline f2 = \\tablePlot([[0, 1, 4, 9, 16, 25], [0, 1, 2, 3, 4, 5]]);\\newline f3 = \\paramPlot([\\sin(x), \\cos(x)], [-10, 10]);\\newline f4=\\tablePlot([[0, 1, 4, 9, 16, 25], [0, -1, -2, -3, -4, -5]]);\\newline \\showPlots([f1, f2, f3, f4]);', offset: 284 },
                { title: 'approximation', dataInsert: 'SPACE=R64[x];\\set2D(0, 5, -5, 10);\\newline A=[[0, 1, 2, 3,  4, 5],[3, 0, 4, 10, 5, 10]];\\newline  t=\\table(A);\\newline p=\\approximation(t,4);\\newline P=\\plot(p );\\newline T=\\tablePlot(t);\\showPlots([P,T]);\\print(p);', offset: 215 },
                { title: 'tableFromFile', dataInsert: '=\\tableFromFile(\'\');', offset: 17 },
                { title: 'table', dataInsert: '=\\table();', offset: 8 },
              ],
            },
            {
              title: this.$t('tips.plots3D'),
              items: [
                { title: 'plot3d', dataInsert: '\\clean(); SPACE = R64[x, y, z];f = x^2 / 20 + y^2 / 20;\\newline pl=\\plot3d([f], [-20, 20, -20, 20]);', offset: 100 },
                { title: 'implicitPlot3d_1', dataInsert: '\\clean(); SPACE = R64[x, y, z];f = -x^2+2y^2+3z^2-25; iPl=\\implicitPlot3d( f, -10, 10, -10, 10, -10, 10);', offset: 100 },
                { title: 'implicitPlot3d_2', dataInsert: '\\clean(); SPACE = R64[x, y, z];f = (x^2+y^2+z^2)^2-80xyz; iPl=\\implicitPlot3d( f, -10, 10, -10, 10, -10, 10);', offset: 100 },
                { title: 'explicitPlot3d', dataInsert: '\\clean(); SPACE = R64[x, y, z];f = (x^2+y^2)/20; ePl=\\explicitPlot3d( f, -10, 10, -10, 10, -10, 10, 40);', offset: 100 },
              ],
            },
            {
              title: this.$t('tips.parametricPlots3D'),
              items: [
                { title: 'Torus', dataInsert: '\\clean(); SPACE = R64[u, v]; X=\\cos(u)*(3+\\cos(v)); Y=\\sin(u)*(3+\\cos(v)); Z=\\sin(v);pPl=\\parametricPlot3d(X, Y, Z, 0, 7, 0, 7, 64);', offset: 100 },
                { title: 'Spiral', dataInsert: '\\clean();  SPACE = R64[u, v]; X=\\cos(u)*(\\cos(v)+2); Y=\\sin(u) * (\\cos(v)+2); Z=\\sin(v)+u/2+1; pPl=\\parametricPlot3d(X,Y,Z, -6.3, 6.3, -3.15, 3.15, 64);', offset: 100 },
                { title: 'Dini\'s surface', dataInsert: '\\clean();  SPACE = R64[u, v]; X = \\cos(u) * \\sin(v) * 2.5; Y = \\sin(u) * \\sin(v) * 2.5; Z = \\cos(v) + \\ln(\\tg(v / 2)) + u / 6; pPl=\\parametricPlot3d(X, Y, Z, 0, 12.56, 0.001, 2, 64);', offset: 100 },
              ],
            },
            {
              title: this.$t('tips.graphProblems'),
              items: [
                { title: 'plotGraphMatrix', dataInsert: 'M=[[0,1,1,0,1,0],[1,0,0,1,1,0],[1,0,0,0,1,1],[0,1,0,0,0,0],[1,1,1,0,0,1],[0,0,1,0,1,0]]; \\newline \\plotGraph(M);' },
                { title: 'plotGraphAdMatrixCoord', dataInsert: 'M=[[0,1,1,0,1,0],[1,0,0,1,1,0],[1,0,0,0,1,1],[0,1,0,0,0,0],[1,1,1,0,0,1],[0,0,1,0,1,0]];\newline P=[[3,2,4,1,3,5],[3,2,2,1,1,1]]; \\newline \\plotGraph(M,P);' },
                { title: 'plotCompleteGraph', dataInsert: '\\plotGraph(5);' },
                { title: 'searchLeastDistances', dataInsert: '\\searchLeastDistances()', offset: 22 },
                { title: 'findTheShortestPath', dataInsert: '\\findTheShortestPath()', offset: 21 }
              ]
            },
            {
              title: this.$t('tips.tableInText'),
              items: [
                { title: '"Table in text"', dataInsert: '" \\begin{array}{|l|c|r|} \\hline \\hbox{This is}&{\\bf bold}&{\\it italic}\\\\ \\hline 1&2&3\\\\ \\hline \\end{array} "', offset: 100 },
              ],
            },
          ],
        },
        {
          title: this.$t('tips.cluster'),
          extended: true,
          items: [
            {
              title: this.$t('tips.functions'),
              items: [
                { title: 'getStatus', dataInsert: '\\getStatus();', offset: 11 },
                { title: 'getCalcResult', dataInsert: '\\getCalcResult();', offset: 15 },
                { title: 'matrixMult:1x8', dataInsert: '\\matMultPar1x8(A, B);', offset: 16 },
                { title: 'Tropical: Ax=x', dataInsert: '\\SPACE = ZMinPlus[x, y]; A = [[1, 1],[2, 0]]; \\newline \\BellmanEquationPar(A);' },
                { title: 'Tropical: Ax ≤ x', dataInsert: '\\SPACE = ZMinPlus[x, y];  A = [[1, 1],[2, 0]]; \\newline \\BellmanInequalityPar(A);' },
                { title: 'Tropical: Ax+b=x', dataInsert: '\\SPACE = R64MaxPlus[x, y];  A = [[0, -2], [-\\infty, 0]];  b = [1, -\\infty]; \\newline \\BellmanEquationPar(A, b);' },
                { title: 'Tropical: Ax+b≤x', dataInsert: '\\SPACE = R64MaxPlus[x, y];  A = [[0, -2], [-\\infty, 0]];  b = [1, -\\infty]; \\newline \\BellmanInequalityPar(A, b);' }
              ]
            },
            {
              title: this.$t('tips.constants'),
              items: [
                { title: 'TOTALNODES', dataInsert: '\\TOTALNODES = ;', offset: 14 },
                { title: 'PROCPERNODE', dataInsert: '\\PROCPERNODE = ;', offset: 15 },
                { title: 'CLUSTERTIME', dataInsert: '\\CLUSTERTIME = ;', offset: 15 },
                { title: 'MAXCLUSTERMEMORY', dataInsert: '\\MAXCLUSTERMEMORY = ;', offset: 20 }
              ]
            }
          ]
        }
      ];
    }
  },
  methods: {
    onTipClicked(dataInsert, offset) {
      this.$emit('tip:selected', { exerciseId: this.exerciseId, dataToInsert: dataInsert, offset });
    },
    check(tip) {
      if (this.isExtended) {
        return true;
      }
      return !tip.extended;
    }
  }
};
</script>

<style>
  .inner-tip__container {
    border-bottom: 1px solid rgba(0,0,0,0.12);
  }
</style>
