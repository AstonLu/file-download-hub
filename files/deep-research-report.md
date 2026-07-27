# 台灣券商金融市場部門與凱基證券定位深度研究

## 研究摘要與方法界線

**結論先行：**若用國際語境理解，Global Markets 是券商的「流量分配 + 資本負債表中介 + 風險轉換」引擎，核心不是單純交易，而是把客戶需求轉成可定價、可避險、可分銷的商品與風險部位；但放到台灣，券商實務上的「金融市場部門」通常比美系投行的 full-service Global Markets 更窄，重心落在 **equities brokerage、margin/stock lending、warrants/structured products、fixed income distribution、OSU 外幣商品、prop trading**，而完整的 rates/credit/FX OTC flow、prime brokerage、跨資產 structuring，常受法規、客群深度與市場結構限制，部分功能由銀行或 OSU 承接。這代表你在凱基內部若要和業務單位對話，最有效的框架不是照抄 bulge bracket 組織圖，而是先用 **券商整體損益地圖** 看哪些部門真的賺錢，再把「商品—收入名稱—獲利邏輯—風險指標—台灣可做範圍」逐層對上。citeturn6search0turn6search1turn8search1turn9search1turn51search2

本報告嚴格區分三類資訊。**事實** 只採官方年報、財報、法規與交易所/公會資料；**推論** 係由年報中的收入表、資產負債表、商品說明與市場排名反推；**假設** 則用於公開一手資料未能充分揭露的細部商品貢獻。台灣月度券商財務資料與業務統計確由 TWSE「證券商月報」與 TWSE OpenAPI 對外提供，因此可作為你後續做 finer-cut 策略模型的補充底庫；本次回覆以 2025 年年報年度資料為主，月報只用於方法驗證，不強行做無法穩健重建的精確月度拆分。citeturn11search0turn11search14

## 券商整體損益地圖與 Global Markets 的位置

在 sell side 券商內，最上層損益地圖通常可分成 **Wealth/Distribution、Global Markets、Investment Banking、Asset Management/Principal Investments、Infrastructure/Research** 幾個主區塊。**Global Markets** 負責二級市場的交易、做市、庫存管理、客戶流量撮合與風險轉換；**IB** 著重一級市場的股債承銷、IPO/SPO、財顧與資本籌措；**Wealth** 是客戶資金入口與產品分銷端；**AM** 則代表 buy side 的受託投資與資產管理。換句話說，Global Markets 是 sell side 最接近「市場價格形成」的部門，而 buy side 是用資本去表達配置觀點，不以 spread capture 或 inventory intermediation 為核心。citeturn6search0turn6search1turn51search2

更實務地說，Global Markets 的內部邏輯有兩條主線。第一條是 **agency flow**：替客戶成交、收手續費或佣金、偶爾加上 execution/financing/custody 服務費。第二條是 **principal intermediation**：券商自己先接下部位，再透過 bid-ask spread、carry、hedging、inventory optimization、structuring margin 與再分銷獲利。國際上這兩條線在 FICC 與 Equities 都存在；台灣券商則更常見於 **經紀、融資融券、借券、權證/結構型商品、自營、債券與 OSU 業務**。這也是你做策略分析時最重要的第一個切分：**哪個收入是客戶流量收入，哪個收入其實來自 balance sheet 與 risk warehousing。**citeturn6search1turn14view0turn50view0turn44view0

### Sell side 與 buy side 的界線

Sell side 的 Global Markets 以「服務客戶交易 + 提供 liquidity + 報價 + product manufacturing」為主，研究部門多半服務 sales/trading 與外部客戶；buy side 則是用客戶資金或自有資產做投資決策，績效來源是 alpha、beta、asset allocation 或 liability management。**Research 在 sell side 不直接持有客戶資產，但會影響 flow、wallet share 與 corporate access；在 buy side，research 是投資決策輸入。**這一點在台灣法人經紀業務尤其重要，因為研究部門對機構客戶、法說會、corporate access 的支持，常是經紀與 ECM/IB 爭取 wallet share 的隱性基礎設施。富邦證券 2025 年舉辦 1,209 場法說會與座談會、211 場上市櫃公司參訪、985 場線上會議，正反映 sell-side research/corporate access 與 institution brokerage 的高度耦合。citeturn6search0turn44view0

## Global Markets 的 MECE 業務框架

國際標準框架下，Global Markets 可先分成 **Sales、Trading、Structuring、Research** 四個職能，再和 **FICC、Equities** 兩條資產別主線交叉。這是最適合從零建立知識體系的骨架。citeturn6search0turn6search1

**Sales** 的工作不是「推銷產品」而已，而是把客戶需求翻成可成交的交易語言：誰要 hedge、誰要 leverage、誰要 carry、誰重視 liquidity、誰要 yield enhancement。收益多來自佣金、distribution fee、execution fee、結構型商品銷售點差與交叉銷售。風險主要不是市場風險，而是客戶集中度、價格競爭、適合度與合規風險。citeturn6search1turn51search2

**Trading** 負責報價、庫存、避險與 P&L 管理。Agency desks 重執行；principal desks 重 inventory 與 risk warehousing；market making desks 重雙邊報價與庫存 turnover。核心收入來自 bid-ask spread、inventory carry、hedged warehousing、volatility capture、funding spread 與選擇權 time decay 等。核心風險是 delta/gamma/vega、DV01、credit spread、basis、liquidity gap、jump risk 與 VaR。citeturn6search1turn6search2turn6search3

**Structuring** 把底層資產、衍生品與客戶約束條件組裝成可銷售產品，例如 autocallables、yield enhancement notes、equity-linked notes、FX linked notes、credit-linked notes、CB/CBAS/CBOP 解法、資產交換或客製化 hedging package。收入通常不是單一 fee，而是嵌在產品價格中的 structuring margin、implied vol spread、funding benefit 與 hedge optimization。對台灣券商來說，這塊常以 **權證、非保本結構型商品、海外債/結構債、OSU 外幣產品** 的形式出現。富邦證券 2025 年非保本結構型商品承作規模市場第二、承作檔數市場第一，就是台灣版 structuring/derivatives franchise 的代表。citeturn44view0

**Research** 雖不一定直接創造會計收入，但能提高 brokerage share、institutional wallet share、corporate access 影響力、投行案件取得率與品牌溢價。對 sell side 而言，它是 distribution infrastructure，不是單獨損益中心。citeturn44view0

### FICC 與 Equities 的商品樹

FICC 可 MECE 分成 **Rates、Credit、FX、Commodities、Money Markets/Financing**。國際上各自對應的代表商品包括：  
利率類有 govies、bills、repo、IRS、swaptions、bond futures；信用類有 cash bonds、credit indices、CDS；外匯類有 spot、forwards、swaps、options、NDF；商品類有 energy、metals、agri futures/swaps/options；貨幣市場與融資有 CP、repo/reverse repo、securities lending、stock borrow、prime finance。這些商品的收入來源大致可歸納為 **bid-ask spread、carry、roll-down、funding spread、clearing/financing fee、structuring margin、market-making revenue**。citeturn6search0turn6search1turn6search3

Equities 可分成 **Cash Equities、Equity Derivatives、Prime Brokerage/Financing、Market Making**。現貨股票與 ETF 主要賺佣金、execution fee、融資利差、借券收入；股權衍生品主要賺 option premium、vol spread、issuer margin、hedging edge、warrant spread；prime brokerage 則是 custody、margin financing、securities lending、swap financing、synthetic exposure 的套裝收入；market making 重點在 spread capture 與 inventory turnover。台灣最常見的在地化版本是 **台股現貨、ETF、融資融券、借券、權證、期權 IB、海外股票複委託、結構型商品、興櫃/ETF/權證造市**。citeturn44view0turn50view0

### 商品與收入對應的核心邏輯

最簡單的判斷法是：  
**如果券商不需要自己吃風險，主要收入多半是手續費/佣金/代銷費；如果券商先承擔部位、再避險或再分銷，主要收入多半來自 spread、carry、hedge slippage 與庫存管理能力。**  
例如：
- 股票經紀：佣金、手續費折讓後淨收入。  
- 融資融券/不限用途借貸：利差、借券費、資金運用收益。  
- 債券做市：bid-ask spread、repo carry、inventory carry。  
- 權證/結構型商品：發行/銷售價差、隱含波動率邊際、動態避險績效。  
- 承銷：包銷報酬、代銷手續費、承銷作業處理費、輔導費、安定操作/庫存管理衍生收益。  
- 海外產品分銷：通路費、轉單/執行費、custody/FX spread、產品 margin。citeturn15view0turn44view0turn50view0

## 風險指標、避險工具與國際趨勢

Global Markets 的風險指標要跟商品族群一一對應。**Rates book** 看 duration、DV01、curve risk、basis risk；**Credit book** 看 spread duration、jump-to-default、issuer concentration；**Equity delta-one** 看 beta、inventory gap、borrow availability；**Options books** 看 delta/gamma/vega/theta；**leveraged finance / margin** 看 funding liquidity、collateral quality、wrong-way risk；整體則看 VaR、stress VaR、liquidity horizon、PFE/EE 與資本占用。DV01 的本質是利率變動 1bp 對部位價值的影響，公債期貨、IRS、CDS 是最常見的 rates/credit hedging scaffold；其重要性在於交易部位不是只看方向，而是要把 P&L 來源拆成 carry、curve、spread、vol 與 basis。citeturn6search2turn6search3

近年最關鍵的國際趨勢有三個。第一，**electronification** 持續擠壓單純人工撮合的佣金與 spread，讓高流動性商品更趨 commodity 化；第二，**portfolio trading 與 automated pricing** 正改變債券與 ETF/因子交易的執行形態；第三，**巴塞爾市場風險與交易對手風險資本要求** 提高了做市與自營庫存的資本成本，使券商更偏好高周轉、低 capital intensity、可快速對沖的 flow business，而不是長時間倉儲風險。這也是為什麼全球大型券商一邊擴大電子化與量化做市，一邊更重視 financing、client franchise、data 與 balance-sheet efficiency。citeturn7search0turn7search1turn6search2

對台灣券商的策略含義很直接：**長期最脆弱的是純手續費經紀；中期最值得看的，是財管分銷、海外產品、結構型商品、券源/資金中介、ETF/衍生品做市與 OSU；最需要警惕的，是把自營獲利誤判成可持續 franchise 收入。**這不是否定自營，而是要把自營的收益分成 beta、carry、issuer franchise、做市能力與一次性行情貢獻。citeturn44view0turn50view0turn16search2

## 台灣制度、法規邊界與市場特殊性

台灣法規上的券商主分類仍以 **經紀、自營、承銷** 為核心，並延伸到 **融資融券、財富管理、信託、投顧、新金融商品、證券相關期貨、OSU 國際證券業務**。這與美系投行以 FICC/Equities/Banking/Wealth 的內部管理口徑不同，因此你在內部做部門 mapping 時，必須把「監理分類」與「經營分類」分開看。永豐金證券年報對其業務範圍就明列：受託買賣、自行買賣、融資融券、複委託、承銷、股務代理、期貨相關業務、財富管理、信託、投顧等；TWSE「證券商月報」亦按官方口徑提供券商財務資料。citeturn8search1turn11search0turn50view0

台灣與國際 Global Markets 最大差異，在於 **完整 OTC FICC 深度、prime brokerage、生態系融資與 cross-asset structuring 的開放與市場深度較有限**。但 OSU 是重要例外。依國際金融業務條例相關規範，證券商 OSU 可經營外幣有價證券及外幣金融商品的經紀、財富管理、承銷、自營、保管等業務；永豐金證券亦在年報明載其 2014 年設立 OSU，經營外幣有價證券與外幣金融商品之經紀、財富管理、承銷、自營及保管業務。**推論：**台灣券商如要更接近國際 GM 模式，OSU 與高資產客群財管就是最現實的落地載體。citeturn9search1turn50view2

另一個台灣特點是，**券商經紀與財管的關係比國際投行更緊**。例如富邦證券把營業結構直接分成「經紀及財管、金融交易、投資銀行」三大塊，2025 年占比分別為 75%、18%、7%；永豐金證券則以官方口徑揭露 2025 年經紀 67.68%、自營 28.24%、承銷 2.87%、其他 1.21%。這種揭露方式本身就在告訴你：台灣大型綜合券商的核心，不是純 FICC desk，而是 **distribution-led franchise 加上 prop/derivatives 補足 ROE**。citeturn44view0turn50view0turn52view2

## 六家券商比較與凱基定位

先看可直接驗證的事實。**富邦證券** 2025 年營業收入 261.96 億元，其中經紀及財管 75%、金融交易 18%、投資銀行 7%；稅後淨利 105.9 億元，台債承銷市佔率 16.68% 排名第一，融資、借券與興櫃排名第二、經紀排名第三。**永豐金證券** 2025 年營業收益 217.87 億元，其中經紀 67.68%、自營 28.24%、承銷 2.87%；且 OSU 與高資產專區是其近年明確成長方向。**凱基證券** 2025 年收入 289.27 億元、淨利 115.09 億元、資本適足率 298%，業務範圍明列承銷、自營、受託買賣、期貨交易輔助、期貨自營、財富管理與國際證券業務。citeturn44view0turn50view0turn50view2turn16search2turn16search5

### 六家券商的相對位置

**元大證券**：**推論，高信心** 為台灣最強零售 brokerage/distribution 平台之一，優勢在通路、客戶基盤、海外商品廣度、證券/財管/複委託/期貨帳戶整合。官方網站已明示其海外債、境外結構型商品、境外基金、海外股票與四合一開戶布局。這意味著元大的核心優勢不是單一 GM desk，而是 **大流量 + 大渠道 + 海內外商品超市 + cross-sell**。citeturn35view0turn40view0

**富邦證券**：**事實，高信心**，六家中最接近「均衡型 modern securities house」。它不只經紀強，還把財管、結構型商品、量化 ETF 造市、債券、承銷與法人業務都做成可被年報驗證的第二曲線。若以「台灣版 Global Markets + Wealth + IB 平衡度」評比，富邦是目前最完整的 benchmark 之一。citeturn44view0

**國泰證券**：**推論，中信心**。官方可見的一手資料顯示其證券年報與合併財報皆定期揭露，且財報把經紀手續費列為關鍵查核事項，意味收入結構仍明顯受 brokerage/flow 驅動；同時，國泰金控在年報與 IR 活動上持續圍繞資產管理中心、數位化與集團協同。這支持一個保守判斷：國泰證券的中長期打法更可能是 **bank-securities cross-sell + digital wealth + flow monetization**，而非激進擴張高資本占用的自營 GM。citeturn17search10turn47search4turn45search9turn46view0

**永豐金證券**：**事實，高信心**，是六家中最適合對照「台灣法規分類如何落地成經營分類」的案例。它清楚揭露經紀/自營/承銷比重，也把固定收益、財富管理信託、OSU 與高資產中心寫成成長主軸。你若要理解台灣券商如何從 brokerage house 轉成 semi-GM/wealth platform，永豐是很好用的模板。citeturn50view0turn50view2turn52view3

**群益金鼎證券**：**推論，低至中信心**。目前可直接抓到的一手官方公開來源，較清楚的是其官方網站已將基金、債券、結構型商品、借券與定期定額股票/ETF 放入財富管理產品組合，且 ESG/IR 專區多次提及法說會與永續/數位金融創新；外部新聞顯示其把「AI 智能財管」作為第二成長引擎，但該點屬二手資料，不能當作硬事實。**保守判斷：**群益的差異化更可能來自 **零售與交易盤基礎 + 數位工具 + 財管升級**，而非大規模 FICC franchise。citeturn24search5turn25search7turn51search5

**凱基證券**：**事實 + 推論，中高信心**。與偏 retail/distribution 的同業相比，凱基更有「市場部門感」：2025 年透過損益按公允價值衡量金融資產達 1,199.79 億元，附買回債券負債 817.43 億元，應收證券借貸款項 320.91 億元，借券保證金存出 468.33 億元；同時淨經紀手續費為 76.07 億元、承銷收入 7.42 億元。**推論：**凱基相對同業的特色，是 **較大交易簿 + 較深 balance-sheet intermediation + 較完整 securities/OSU/wealth/derivatives 能力**，因此若你從策略企劃角度要抓「更接近台灣版 Global Markets 的券商」，凱基確實是最值得深入拆解的標的之一。citeturn14view0turn15view0turn16search2turn52view0

### 凱基的強項、弱項與成長機會

**強項。**凱基的強項不是單一零售流量，而是 **交易簿規模、資金與券源中介能力、跨商品能力、期貨與國際證券業務、集團資源**。從財務結構看，凱基明顯比純經紀導向券商更仰賴交易與資產負債表；從業務範圍看，又同時具備財富管理與 OSU 能力。這讓它比純 brokerage house 更適合走「wealth × markets × financing」的複合式成長。citeturn16search5turn14view0

**弱項。**第一，交易導向獲利通常波動較大，受市況、利率、波動率與資本成本影響顯著；第二，若財管與分銷滲透率不足，可能出現「自營賺很多、客戶 franchise 不夠深」的結構性問題；第三，若電子化與價格競爭持續，單純經紀利差會被壓縮。這些不是凱基獨有，但對交易簿較大的券商更敏感。citeturn6search2turn7search1turn16search2

**成長機會。**最值得關注的三個方向是：  
其一，**高資產財管/OSU/外幣商品**，因其最能把 GM 的商品製造能力轉成穩定 distribution revenue；  
其二，**券源、融資、借券、固定收益與結構型商品**，這些是 balance-sheet skill 最容易轉成可持續 franchise 收益的領域；  
其三，**One KGI/集團協同**，若銀行、保險、投信與證券的客戶資料、產品供給與 RM/通路真正打通，凱基可望把交易能力轉成 wealth share，而不只是 prop P&L。凱基金控官方永續報告已明示集團揭露範疇涵蓋凱基證券、銀行、人壽與投信等主要子公司；凱基證券年報亦明列母公司為凱基金控。citeturn16search4turn16search5

## 表格整理

### 表 A｜券商整體損益地圖

| 部門 | 主要商品 | 收入名稱 | 獲利邏輯 | 風險屬性 |
|---|---|---|---|---|
| 經紀 Brokerage | 台股現貨、ETF、興櫃、複委託海外股票 | 受託買賣手續費、執行費 | 流量越大、留存率越高、費率折讓控制越好，淨手收越高 | 低市場風險；高價格競爭、合規與數位中斷風險 |
| 信用與券源 Financing | 融資融券、不限用途借貸、借券、stock lending | 利息收入、融資利差、借券費、券源收入 | 用資金與券源中介賺 funding spread 與 availability premium | 信用、抵押品、市場急跌、券源緊缺 |
| 金融交易 GM | 股票、ETF、債券、票券、期貨/選擇權、權證、結構型商品 | bid-ask spread、做市收入、自營 carry、評價損益、vol spread | 用庫存、做市與避險能力把市場風險轉成 spread/carry/issuer margin | Delta/Gamma/Vega、DV01、spread、basis、VaR、流動性 |
| 固定收益 FICC | 公債、公司債、海外債、repo/reverse repo、利率相關產品 | 債券價差、repo carry、利息收入、分銷費 | 債券分銷與持有收益結合，仰賴 funding 與 inventory 管理 | Duration、DV01、credit spread、liquidity |
| Structuring | 非保本結構型商品、ELN、FX-linked/credit-linked、權證 | 結構型加成、發行價差、隱含波動率利差、避險績效 | 將客戶需求包裝成產品，賺 product margin 與 hedge edge | Model risk、gap risk、hedging slippage、適合度 |
| Investment Banking | IPO、SPO、ECB/CB、財顧、股代 | 包銷報酬、代銷手續費、承銷作業費、輔導費、FA fee | 一級市場案件取得與定價能力 | 包銷庫存、案件集中、法規與聲譽 |
| Wealth Management | 基金、保險、海外債、結構型商品、信託 | 分銷佣金、通路費、顧問/信託費 | 以 RM/數位平台做資產配置與長期客戶經營 | 適合度、贖回波動、AUM 流失 |
| Research/法人服務 | 報告、corporate access、法說會、論壇 | 間接帶動 brokerage/IB wallet share | 強化機構客戶黏著度與投行案件來源 | 人才流失、獨立性與法遵 |

表 A 的國際框架主要根據 sell-side market structure、dealer market making 與台灣券商公會對證券業務分類的公開介紹整理；台灣化商品例子則以富邦、永豐、凱基官方年報揭露為主。citeturn6search0turn6search1turn51search2turn44view0turn50view0turn15view0

### 表 B｜商品貢獻與成長矩陣

| 商品 | 現況貢獻度 | 未來成長潛力 | 信心水準 | 判斷依據 |
|---|---|---|---|---|
| 台股現貨經紀 | 高 | 持平偏弱 | 高 | 仍是多數券商大宗收入，但電子化與費率戰壓力大；富邦、永豐皆顯示經紀仍為大宗。citeturn44view0turn50view0 |
| 融資融券 | 中高 | 持平 | 高 | 利差穩定但受市場成交與融資餘額循環影響。citeturn44view0 |
| 借券/券源 | 中 | 成長 | 高 | 富邦借券均額年增 25%，永豐亦將其列入經紀延伸服務。citeturn44view0turn50view0 |
| 海外股票複委託 | 中 | 成長 | 高 | 富邦海外股票交易量年增 56%；元大、永豐、群益皆把海外商品放核心產品。citeturn44view0turn35view0turn50view0turn51search5 |
| 海外債分銷 | 中 | 成長 | 高 | 富邦海外債交易量年增 65%，群益官方財管頁亦列為核心產品。citeturn44view0turn51search5 |
| 基金/保險分銷 | 中 | 持平偏成長 | 中 | 屬財管黏著收入，但受市場情緒與法規影響；富邦保險銷量成長。citeturn44view0 |
| 權證 | 中高 | 成長 | 高 | 台灣零售衍生品深度足，富邦、永豐皆揭露權證/衍生性商品地位。citeturn44view0turn52view3 |
| 非保本結構型商品 | 中 | 成長 | 高 | 富邦承作規模市場第二、檔數第一；與高資產財管連動。citeturn44view0 |
| ETF 造市/量化做市 | 中 | 成長 | 中高 | 電子化與 ETF 市場擴大，富邦獲最佳 ETF 造市券商。citeturn44view0turn7search1 |
| 債券自營/固定收益 | 中 | 成長 | 中高 | 降息循環、正息差與高資產客戶需求有利，但資本占用較高。citeturn44view0turn6search2 |
| 純 direction prop trading | 中 | 波動大 | 中 | 短期可高獲利，但永續性較差、受資本與市況制約。citeturn6search2turn16search2 |
| IPO/SPO 承銷 | 低中 | 持平偏成長 | 中高 | 受資本市場景氣影響大，但為 franchise 與集團綜效重要入口。citeturn44view0turn50view0 |
| OSU 外幣商品/高資產專區 | 低中 | 成長 | 高 | 永豐已明確佈局高資產專區與 OSU；台灣若要靠近國際 GM，這是關鍵落點。citeturn50view2 |
| Prime brokerage 全功能 | 低 | 成長受限 | 中 | 台灣券商可做的廣義 financing 存在，但完整國際 PB 生態較受限。此為法規與市場深度推論。citeturn8search1turn9search1 |

### 表 C｜六家台灣券商業務結構比較

| 券商 | 2025 規模與可驗證結構 | 相對強項 | 近年策略 | 判斷 |
|---|---|---|---|---|
| 凱基 | 收入 289.27 億、淨利 115.09 億；業務範圍涵蓋承銷、自營、受託買賣、期貨、財富管理、國際證券；淨經紀手收 76.07 億、承銷收入 7.42 億。citeturn16search2turn16search5turn15view0 | 市場部門、balance-sheet intermediation、OSU/wealth | 母集團整合、財管與國際證券並進 | **推論：自營/GM 偏強，非純零售型** |
| 元大 | 官方網站揭露 2025 年年報/財報、海外債/境外結構型商品/基金/海外股票及四合一帳戶服務。citeturn35view0turn40view0 | 零售經紀、海外商品分銷、期貨/複委託整合 | 四合一帳戶、海外商品超市、全通路數位化 | **推論：distribution 最強之一；精確比重待補抓年報頁碼** |
| 富邦 | 經紀及財管 75%、金融交易 18%、投資銀行 7%；稅後淨利 105.9 億；債券承銷、借券、融資均強。citeturn44view0 | 均衡型 franchise、財管、結構型、ETF 造市、債券、投行 | AI PRO、財管轉型、量化做市、投行強化 | **事實：六家中最均衡之一** |
| 國泰 | 官方年報/財報持續揭露；經紀手續費收入被列為關鍵查核事項。citeturn17search10turn47search4 | 經紀/數位/銀行協同 | 資產管理中心、集團協同、數位金融 | **推論：flow/wealth 導向，中高信心** |
| 群益 | 官方財管頁列基金、債券、結構型商品、借券、定期定額；IR/ESG 專區揭露法說會頻率。citeturn24search5turn25search7turn51search5 | 零售交易、數位工具、財管升級 | AI 智能財管、跨境財管 | **推論：中型券商中偏經紀+財管；精確比重低信心** |
| 永豐金證券 | 經紀 67.68%、自營 28.24%、承銷 2.87%；OSU、高資產專區、固定收益、財管信託均明列。citeturn50view0turn50view2 | 比重最透明、OSU、高資產、固定收益 | 亞洲資產管理中心高雄專區、股票禮品卡、OSU/財管擴張 | **事實：brokerage-led，但國際與高資產成長邏輯明確** |

### 表 D｜凱基定位

| 業務 | 現況強弱 | 同業對比 | 成長機會 | 推論信心 |
|---|---|---|---|---|
| 台股經紀 | 中高 | 不及最強零售型通路，但規模不小 | 與財管/數位交叉銷售 | 中 |
| 融資/借券/券源 | 高 | 較能反映 balance-sheet 能力 | 券源、借券、海外券源整合 | 中高 |
| 自營/市場部門 | 高 | 高於多數 retail-led 券商 | 做市、固定收益、結構型商品 | 高 |
| 固定收益/債券 | 中高 | 高於純零售型；仍需看 OSU/法人深化 | 外幣債、repo、高資產債券配置 | 中高 |
| 權證/結構型商品 | 中高 | 具發展基礎 | 與財管、高資產及法人 hedge 結合 | 中 |
| 承銷/投行 | 中 | 非最突出，但可藉集團客戶與市場部門加值 | ECM/DCM/財顧與財管聯動 | 中 |
| 財富管理 | 中 | 仍有擴張空間 | One KGI 交叉銷售、高資產資產配置、OSU | 中高 |
| 國際證券/OSU | 高潛力 | 相對具優勢 | 高資產、外幣商品、境外客戶 | 高 |

表 D 的核心判斷，主要根據凱基 2025 年財務結構、業務範圍揭露與其相對較大的交易簿/資金中介部位所做推論。citeturn14view0turn15view0turn16search2turn16search5

## 關鍵來源清單

以下僅列本報告最負重的官方來源；若你後續要做策略簡報，我建議直接把這些 PDF/頁碼做成 appendix。

- **凱基證券 2025 個體財報暨會計師查核報告**：公司沿革與業務範圍 p.12；資產負債表 p.6-7；經紀手續費收入明細 p.125；承銷業務收入明細 p.126。citeturn14view0turn15view0turn52view0  
- **凱基證券官網財務摘要**：2025 收入 289.27 億、淨利 115.09 億、資本適足率 298%。citeturn16search2  
- **富邦金控 2025 年報**：富邦證券營業比重與 2025 經營計畫 p.173-175。citeturn44view0  
- **永豐金證券 2025 年報**：營運概況、業務範圍與營業比重 p.67-68；產業發展趨勢與 OSU、高資產專區 p.71-73。citeturn50view0turn50view2turn52view2turn52view3  
- **TWSE 證券商月報**：官方月度券商財務資料入口。citeturn11search0  
- **TWSE OpenAPI**：券商資料開放 API 平台。citeturn11search14  
- **國際金融業務條例與相關規範**：證券商 OSU 業務範圍。citeturn9search1  
- **證券商管理規則 / 證券交易法相關檢索結果**：台灣券商監理分類基礎。citeturn8search0turn8search1  
- **ICMA、SIFMA、Basel/CME 相關官方資料**：sell-side market making、電子化交易、portfolio trading、FRTB、DV01/hedging 框架。citeturn6search0turn6search1turn6search2turn6search3turn7search0turn7search1

**最後一句判斷：**如果你的目標是建立可與凱基金融市場部門對話的完整架構，最值得先吃透的不是「所有商品細節」，而是三條主線：**flow business、balance-sheet business、product manufacturing business**。你一旦能把每個 desk 的收入來源，歸到這三類，再用資本占用與風險指標去校正，就已經進入策略企劃與業務主管能真正對話的層級。citeturn6search1turn44view0turn50view0turn16search2