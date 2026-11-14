// Mock API layer for Clawreef local & production static hosting
(function() {
  const originalFetch = window.fetch;
  const CA = "AfCdvu9Mq4vadfzEGYxcqH1JzWG9UwnMdLrZ9fggpump";
  const PUMP_URL = "https://pump.fun/coin/" + CA;

  const mockLive = {
    platform: {
      squads: 142,
      fills: 28420,
      realFills: true,
      realSameSlot: 0.942,
      closed: 1240,
    },
    firehose: {
      births: 2588,
    },
    buyback: {
      spentSol: 0.318,
    },
    fees: {
      feePct: 1,
      holderFeePct: 0,
      holderMinTokens: 1000000,
      holderSharePct: 50,
      everySec: 3600,
      real: {
        feesSol: 0.636,
        trades: 1840,
        holdersShareSol: 0.318,
      },
    },
    burned: 5056752,
    best: {
      wallet: "6KRoz1KFSMkzm7TKZVUT96mkfie187M45sx5JG9aVwvG",
      kol: null,
      perCopy: 0.74,
      sol21: 10.41,
      copies: 14,
      x2: 0.86,
      rugs: 0,
      active7: 3,
    },
    hunt: {
      wallets: 213400,
    },
  };

  const mockCoin = {
    symbol: "REEF",
    mint: CA,
    pump: PUMP_URL,
    x: null, // No X!
  };

  const mockFeed = {
    events: [
      { seq: 101, who: "hunter", kind: "hunt.find", text: "Dig flagged deployer 4jL... funded 8m prior to launch", t: Date.now() - 14000 },
      { seq: 102, who: "copy", kind: "copy.fill", text: "Tide mirrored 1.2 SOL on $REEF-AI within slot 31928420", t: Date.now() - 28000 },
      { seq: 103, who: "sniper", kind: "snipe.fill", text: "Pinch pinched $CORAL at $7.4k MC on slot 0", t: Date.now() - 45000 },
      { seq: 104, who: "guard", kind: "guard.exit", text: "Shell locked in 2.1x profit on $JELLY", win: true, t: Date.now() - 62000 },
      { seq: 105, who: "scout", kind: "scout.done", text: "Scuttle detected momentum wave across 14 Telegram groups", t: Date.now() - 85000 },
    ],
  };

  const critterReplies = {
    hunter: [
      "I'm digging through the latest blocks on pump.fun! Found 3 dev clusters with over 10x previous track records.",
      "Got it! Tracking dev wallets funded 10 mins before deploy. I will alert the squad as soon as one seeds a pool.",
      "Mempool scraped. 213,000 wallets indexed with 78.4% win-rate on early entries.",
    ],
    copy: [
      "Tide's on it! Mirroring the top alpha wallets with sub-second Jito bundles. 1-slot fill guaranteed.",
      "We copy in the same slot whenever possible. Two of us watching, so we never miss a block.",
      "Card armed! Allocating 0.1 SOL per approved launch buy.",
    ],
    sniper: [
      "Pinch ready! Slot 0-1 entry locked with 0.05 SOL priority tip.",
      "Scanning graduation queue. As soon as clean metadata appears, I'm pinching it.",
      "Target acquired: will snipe on the first block with supply checks active.",
    ],
    guard: [
      "Shell on watch! 2x take-profit and -50% trailing stop-loss armed. Your capital is guarded.",
      "Monitoring top 10 holders. If dev dumps > 10%, I will auto-exit immediately.",
      "Position secured. Sleeping with one eye open.",
    ],
    scout: [
      "Scuttle checking channels! CT sentiment velocity is rising +340% for reef and marine narrative.",
      "Indexed 2,800 Telegram alpha channels. Noise filtered, organic hype verified.",
      "Paste any CA and I'll analyze deployer history, holder distribution, and KOL overlap in 3 seconds.",
    ],
  };

  window.fetch = async function(url, options) {
    const urlStr = String(url);

    if (urlStr.includes('/api/live/feed')) {
      return new Response(JSON.stringify(mockFeed), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (urlStr.includes('/api/live')) {
      return new Response(JSON.stringify(mockLive), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (urlStr.includes('/api/coin')) {
      return new Response(JSON.stringify(mockCoin), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (urlStr.includes('/api/wallet-ev')) {
      return new Response(JSON.stringify({ copies: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (urlStr.includes('/api/chat')) {
      let body = {};
      try {
        if (options && options.body) body = JSON.parse(options.body);
      } catch {}
      const role = body.to || 'hunter';
      const replies = critterReplies[role] || critterReplies.hunter;
      const reply = replies[Math.floor(Math.random() * replies.length)];
      return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (urlStr.includes('/api/me')) {
      return new Response(JSON.stringify({ guest: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return originalFetch.apply(this, arguments);
  };
})();
