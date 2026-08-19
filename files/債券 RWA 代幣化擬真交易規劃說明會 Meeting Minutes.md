Date: 2026/08/19 AM  
Participants: 櫃買中心、集保結算所、凱基金控、凱基證券、凱基銀行相關主管及同仁  

# I. Key Takeaways

- **金管會規劃於 2027 年 3 月底前完成國內公司債及金融債 RWA 擬真交易，並直接使用未來正式平台進行測試，2026 年 9 月公告 API、10 月起進行聯通測試**
  - 首階段以新台幣 Digital Native Bond 為主，整檔債券直接以 Token 形式發行
  - 次級市場先維持營業處所議價買賣斷，尚不納入交易所撮合、RP 及差額交割

- **首階段設計以維持現有債券市場運作方式為原則，主要將發行與交割環節導入 Wallet、Private Key、Cash Token 及 DVP，發行審查、KYC、投資人帳載及還本付息大致維持現制**
  - 平台採 B2B 架構，一般法人投資人不需自行建立 Wallet，由 Broker 於鏈下帳簿記載最終持有人
  - 發行人亦可將 Wallet、Private Key Signature 等鏈上作業委託股代處理，降低參與門檻

- **銀行在 RWA 架構中的角色將較現行債券交易提升，證券商無法自行持有款項 Token，須透過交割銀行完成 Deposit Token、跨行結算及可能的 Private Key Custody**
  - RWA Platform 與財金 Cash Token 採共鏈架構，同行以 Deposit Token、跨行以 Interbank Settlement Token 進行交割
  - Private Key 可由參加人自行保管或委託第三方，凱基銀行既有虛擬資產保管能力可作為集團共用 Custody 能力

- **凱基初步表達高度參與意願且具完整金控條件，目前主要待確認 Buyer、集團內部角色分工及最終 Cash Token Custody Model**
  - 凱基可涵蓋 Issuer、Underwriter、Transfer Agent、Dealer、Broker、Settlement Bank 及 Custodian 等多數角色
  - 凱基香港亦預計於 2026 年 8 月底至 9 月進行海外 RWA 發行，可同步累積發行及系統串接經驗


# II. General notes

**主管機關預計於 2027 年 3 月底前完成國內公司債及金融債 RWA 擬真交易，並以正式平台提前驗證未來實際發行與交割流程**

- 擬真交易將直接使用未來預計正式營運的 RWA Platform，實際進行發行、交易與交割操作，僅債券標的本身為擬真發行
  - 主要目的為讓市場參與者於正式上線前完成系統串接、流程熟悉及內部作業練兵
  - 擬真測試完成且法規制度完備後，即可報主管機關公告正式上線

- 整體時程規劃為 2026 年 9 月公告 API 規格、10 月起進行聯通測試，並於 2027 年 3 月中下旬開放外部機構進行擬真交易
  - API 規格將供參加人及第三方 Private Key Custodian 進行系統開發
  - 10 月起可申請 connectivity test 及後續擬真測試

- 首階段商品範圍限於新台幣公司債及金融債，款項端亦先以新台幣 Token 為主
  - 次級市場僅提供營業處所議價買賣斷
  - Exchange matching、RP 及款項差額交割暫不納入首階段


**首階段採 Digital Native Bond 及 B2B 架構，整檔債券直接於鏈上發行，但一般投資人仍維持現有鏈下持有及交易模式**

- 首階段將整檔單期債券直接發行為 Digital Native Token，而非將既有傳統債券部分轉為 Token
  - 未來才進一步研議 Digital Twin，包括傳統部位與 Token 部位並存及雙向轉換
  - 平台技術面已預留虛實轉換機制，但相關法律效果仍待進一步確認

- 一般法人投資人不需自行建立 Wallet 或管理 Private Key，而是由 Broker 代表客戶進行鏈上操作
  - Broker 需將投資人集保帳號上傳至鏈下資料庫及 whitelist
  - 投資人實際持有部位仍以鏈下帳簿及集保帳號記載
  - 四大基金、壽險及其他法人機構因此可維持現有操作方式參與

- 最終投資人資料仍可透過現有集保帳號穿透辨識，不因 Tokenization 改變相關法遵及投資限制管理
  - 集保於還本付息時仍可產製包含最終投資人的完整名冊
  - KYC 亦完全沿用現行制度


**RWA Platform 採金融周邊單位共同建置的聯盟鏈，並與財金公司款項 Token 共鏈，以支援 Bond Token 與 Cash Token 的即時 DVP**

- RWA Platform 底層採 Permissioned Consortium Blockchain，由證交所、櫃買中心、期交所、集保及財金公司共同擔任驗證節點
  - Blockchain technology 採 Hyperledger Besu
  - 集保擔任 Platform System Administrator，負責日常營運及 Application Layer 維護
  - 參加機構可透過 Web Browser 或 API 連線，另採專線及 IP 管控

- 有價證券 RWA 與財金公司 Cash Token 位於同一金融聯盟鏈，使款券可由 Smart Contract 同步完成交割
  - 同銀行體系使用該銀行發行的 Deposit Token
  - 跨行交易則透過 Interbank Settlement Token 完成銀行間結算

- DVP 交割時由雙方分別送出指令，平台完成 Matching 及款券足額檢核後再由 Smart Contract 執行
  - Bond Token 或 Cash Token 任一側不足額即不執行交割
  - 平台亦保留 FOP 交割方式，供不同使用情境選擇


**債券發行程序大致沿用現行制度，主要新增 Token Mint、Wallet Mapping 及 Private Key Signature 等鏈上作業**

- 發行人於發行日前仍依現行程序向櫃買申請發行並向集保辦理債券登錄
  - 公開說明書及發行辦法需額外揭露採 DLT 方式交付、Platform Information、權利事項及特殊風險
  - 除新增揭露事項外，其餘發行程序原則上與現行無實體債券一致

- 發行日由集保依櫃買掛牌公告將 Bond Token Mint 至發行人 Wallet，再依投資人集保帳號 Mapping 至對應參加人 Wallet
  - 發行人或股代輸入投資人集保帳號及交付數量
  - 發行人完成 Delivery Instruction 及 Private Key Signature 後執行 Token Transfer

- 發行交割可採 FOP 或 DVP，兩者主要差異在於是否同步導入 Cash Token
  - FOP 由發行人自行確認法幣已收足後，再送出 Bond Token Delivery Instruction
  - DVP 則待發行人及投資人雙方指令完成後，由平台確認款券足額並同步交割

- 發行人不一定需要自行建置 Wallet 或 Private Key Infrastructure，可完整委託股代處理鏈上作業
  - 股代可代理 Platform Application、Wallet Binding、Delivery Information、Delivery Instruction 及 Signature
  - 股代若代理多家 Issuer，每家 Issuer 仍需建立獨立 Wallet 及 Private Key


**次級市場初期仍沿用現有 OTC 議價交易模式，RWA Platform 的主要改變集中在交易完成後的鏈上 Settlement**

- 次級市場首階段僅提供營業處所買賣斷，交易仍於現有市場完成議價並依 T+2 規則辦理交割
  - RWA Platform 初期不負責 Price Discovery 或 Matching
  - Dealer、Broker 及底層法人仍沿用現有市場角色

- Dealer 間的 B2B DVP 由買賣雙方各自輸入交割指令，再由平台完成 Matching、足額檢核及同步交割
  - 雙方皆直接以參加人 Wallet 進行 Bond Token 及 Cash Token Settlement

- Dealer 與法人客戶間的 B2C DVP 則由 Broker 代表底層投資人完成鏈上確認
  - Broker 先確認投資人款項已透過分戶帳或指定帳戶收足
  - Broker 再於 RWA Platform 代客戶確認，底層投資人本身不需操作 Wallet
  - 投資人賣出後，Broker 收取 Deposit Token 並轉換為法幣匯回指定銀行帳戶


**證券商無法自行持有 Cash Token，使 Settlement Bank 成為 RWA DVP 必要角色，銀行亦可能進一步延伸至 Private Key Custody**

- 證券商除自行建立 Bond Token Wallet 外，款項 Token Wallet 必須透過往來或交割銀行於銀行體系下開立
  - 證券商發送交割指令後，銀行需配合回覆及執行款項相關作業
  - 銀行因此成為證券商參與 DVP 的必要基礎設施提供者

- 財金公司目前規劃兩種 Cash Token Private Key 模式，最終架構仍待確認
  - 參加人自行管理 Private Key 並完成 Signature
  - 由 Settlement Bank 統一保管 Private Key 並代為完成 Signature

- 銀行若進一步提供 Private Key Custody，可讓證券、自營及股代等單位降低各自重複建置的需求
  - Token 本身仍存在 Blockchain Wallet 中
  - Custodian 實際保管的是 Private Key，而非實質持有 Token


**Private Key 可由參加機構自行建置或委託第三方專業機構保管，兩種模式的差異主要在系統建置及作業責任**

- 採 Self-custody 的參加人需自行建立完整的 Key Management 及 Signature Capability
  - 包含 Private Key、Public Key 及 Wallet Address 產製
  - 建置 Signature Module
  - 透過 API 傳送部位移轉及 Settlement Instruction

- 採 Third-party Custody 則由合資格第三方機構提供 Private Key 保管及 Transaction Signing Service
  - 第三方 Custodian 可提供 Key、Address 及 Signature 等相關服務
  - RWA Platform 可透過 API 呼叫第三方完成簽章

- 若參加機構不希望自行開發 API，集保亦研議提供 Web Interface 供較簡易的操作模式


**虛實轉換及還本付息已盡量與現有集保制度銜接，但虛實轉換的部分法律效果仍待主管機關確認**

- 平台技術上規劃支援 On-chain Token 與 Off-chain 無實體債券雙向轉換，以增加未來市場流動性的彈性
  - 經紀商可協助客戶進行上下鏈
  - 平台以專戶控管 Token 部位，再同步通知傳統存託系統調整相對應部位

- 虛實轉換在系統面已有規劃，但原生發行債券轉為傳統部位時是否需取得 Issuer 認可等法制問題仍在研議
  - 因此首階段仍以 Digital Native 為主

- 還本付息維持現行法幣模式，不因債券 Tokenization 改以 Cash Token 支付
  - 集保仍透過現有系統產製最終投資人名冊
  - 本息兌領機構依名冊以法幣支付
  - 債券到期後 Bond Token 由系統自動註銷


**櫃買目前優先邀請完整金控及已有 RWA 經驗的證券商參與擬真交易，以降低單一機構跨角色協調及技術建置門檻**

- 完整金控因同時具備銀行、證券及金控角色，可於集團內形成較完整的 RWA Testing Ecosystem
  - 櫃買將凱基此類完整金控列為優先拜訪及邀請對象

- 已參與黃金現貨 RWA 的證券商亦為優先邀請對象，主因其已投入解決 Private Key Custody 等核心技術門檻
  - 後續再參與 Bond RWA 的 Incremental Cost 相對較低

- 壽險、票券公司及四大基金制度上均可參與，但擬真階段未要求完整 Investor Universe 同步上線
  - 初期以金融機構直接完成測試為主
  - 正式上線後再逐步擴大投資人端參與


**凱基具備多數 RWA 價值鏈角色且過去已有相關 POC 經驗，初步參與意願高，現階段主要限制在 Buyer 及內部 Operating Model 尚未確認**

- 凱基證券業務端表示希望參與擬真交易，並透過實際操作提前熟悉未來 RWA 發行及交易模式
  - 目前首要前提為找到願意搭配的合格 Buyer
  - 櫃買亦表示可協助媒合其他金融機構參與

- 凱基集團現有能力已涵蓋多數參與角色
  - 證券端可涵蓋 Issuer、Underwriter、Transfer Agent、Dealer 及 Broker
  - 銀行端可擔任 Settlement Bank，並已有 Virtual Asset Private Key Custody 經驗
  - 金控策略企劃及數位發展可負責跨子公司整合

- 凱基金控去年已參與基金及外幣債券 RWA POC，曾初步討論 Regulation、Investor Protection 及 Internal System Adjustment
  - 後續可延續既有經驗進行此次 Digital Native Bond 擬真交易

- 凱基香港亦預計於 2026 年 8 月底至 9 月與外部平台合作發行 RWA，並將台灣企業帶往海外發行
  - 可同步累積 Issuance Process、Platform Integration 及實際作業經驗
  - 台灣與香港兩邊經驗後續可互相回饋


**目前尚待確認的議題主要集中在 Buyer、Cash Token Custody、DVP Exception Handling 及虛實轉換法制，將直接影響凱基後續系統與作業設計**

- Buyer 為凱基是否能完成首檔擬真交易的首要前提，目前仍需尋找願意搭配且具有相應能力的金融機構
  - 完整金控及已有 RWA 經驗的證券商可能較快 Ready
  - 壽險及政府基金等大型法人中後台準備時間可能較長

- Cash Token Private Key 最終由證券商自行保管或由 Settlement Bank 代管仍未定案
  - 最終選擇將直接決定證券及銀行各自需要建置的系統範圍

- 大額 Primary DVP 的 Exception Handling 尚未完整設計
  - Issuer 目前無法在發出指令前直接查看其他機構 Wallet 餘額
  - 仍需事前聯繫確認 Cash Token Ready
  - 平台僅於雙方指令完成後檢核款券足額
  - 若部分 Buyer 款項不足，目前僅確認不足額即不交割，Partial Settlement 等後續流程仍待研議

- Digital Native Bond 與傳統無實體債券的法律地位、發行契約是否需增補條款及虛實轉換的 Issuer Recognition 機制仍待主管機關及法遵進一步確認