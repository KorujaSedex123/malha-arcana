/**
 * Personagens pré-construídos de teste de nível 17 para a Malha Arcana.
 */
export const TEST_CHARACTERS = [
  {
    "name": "Elena Sombrévora (Arquimaga Evocadora - Nível 17)",
    "type": "character",
    "_id": "byaxjFvVHbQY7W5Z",
    "img": "icons/characters/spellcasters/wizard-robe-staff-magic-purple.webp",
    "system": {
      "currency": {
        "cp": 0,
        "sp": 0,
        "ep": 0,
        "gp": 5000,
        "pp": 100
      },
      "identifier": "elena-arquimaga",
      "abilities": {
        "str": {
          "value": 10,
          "proficient": 0
        },
        "dex": {
          "value": 16,
          "proficient": 0
        },
        "con": {
          "value": 16,
          "proficient": 1
        },
        "int": {
          "value": 20,
          "proficient": 0
        },
        "wis": {
          "value": 14,
          "proficient": 0
        },
        "cha": {
          "value": 12,
          "proficient": 0
        }
      },
      "attributes": {
        "ac": {
          "flat": 16,
          "calc": "default"
        },
        "hp": {
          "value": 98,
          "max": 98,
          "temp": 0,
          "tempmax": 0
        },
        "spellcasting": "int",
        "prof": 6
      },
      "details": {
        "level": 17,
        "xp": {
          "value": 225000
        }
      },
      "resources": {
        "primary": {
          "value": 2,
          "max": 20,
          "label": "Corrupção",
          "sr": false,
          "lr": false
        },
        "secondary": {
          "value": 0,
          "max": 0,
          "label": "",
          "sr": false,
          "lr": false
        },
        "tertiary": {
          "value": 0,
          "max": 0,
          "label": "",
          "sr": false,
          "lr": false
        }
      },
      "spells": {
        "spell1": {
          "value": 4,
          "override": 4
        },
        "spell2": {
          "value": 3,
          "override": 3
        },
        "spell3": {
          "value": 3,
          "override": 3
        },
        "spell4": {
          "value": 3,
          "override": 3
        },
        "spell5": {
          "value": 2,
          "override": 2
        },
        "spell6": {
          "value": 1,
          "override": 1
        },
        "spell7": {
          "value": 1,
          "override": 1
        },
        "spell8": {
          "value": 1,
          "override": 1
        },
        "spell9": {
          "value": 1,
          "override": 1
        },
        "pact": {
          "value": 0,
          "override": null
        }
      }
    },
    "items": [
      {
        "_id": "rA0wlJyAakhUiKWT",
        "name": "Mago",
        "type": "class",
        "img": "icons/magic/symbols/crest-shield-arcane-gold.webp",
        "system": {
          "identifier": "wizard",
          "levels": 17,
          "hd": {
            "denomination": "d6",
            "spent": 0
          },
          "spellcasting": {
            "progression": "full",
            "ability": "int"
          }
        }
      },
      {
        "name": "Ação: Purgar a Malha",
        "type": "feat",
        "_id": "QYt9DEDFIzxEXvLN",
        "img": "icons/magic/light/explosion-star-glow-silhouette.webp",
        "system": {
          "description": {
            "value": "Uma ação para purgar a corrupção da Malha Arcana.",
            "chat": ""
          },
          "activities": {
            "zgha1Dh4DwuER2Tk": {
              "_id": "zgha1Dh4DwuER2Tk",
              "type": "utility",
              "activation": {
                "type": "action",
                "value": 1
              }
            }
          }
        }
      },
      {
        "name": "Raio de Fogo",
        "type": "spell",
        "_id": "2XKnijN6WeXxhHxm",
        "img": "icons/magic/fire/beam-jet-stream-yellow.webp",
        "system": {
          "description": {
            "value": "<p>Truque seguro: raio de fogo crepitante.</p>",
            "chat": ""
          },
          "level": 0,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "y00epa7AHWxnKr0P": {
              "_id": "y00epa7AHWxnKr0P",
              "type": "attack",
              "name": "Raio de Fogo",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 18,
                "units": "m"
              },
              "attack": {
                "ability": "",
                "bonus": "",
                "critical": {
                  "threshold": null
                },
                "type": {
                  "classification": "spell",
                  "value": "ranged"
                }
              },
              "damage": {
                "parts": [
                  {
                    "number": 4,
                    "denomination": 10,
                    "bonus": "",
                    "types": [
                      "fire"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Toque Chocante",
        "type": "spell",
        "_id": "dIM1C2W7LCzBbcCM",
        "img": "icons/magic/lightning/bolt-strike-blue.webp",
        "system": {
          "description": {
            "value": "<p>Truque seguro: choque pelo toque impedindo reações.</p>",
            "chat": ""
          },
          "level": 0,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "sAolJ2Rl0M6HhZTN": {
              "_id": "sAolJ2Rl0M6HhZTN",
              "type": "attack",
              "name": "Toque Chocante",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 18,
                "units": "m"
              },
              "attack": {
                "ability": "",
                "bonus": "",
                "critical": {
                  "threshold": null
                },
                "type": {
                  "classification": "spell",
                  "value": "ranged"
                }
              },
              "damage": {
                "parts": [
                  {
                    "number": 4,
                    "denomination": 8,
                    "bonus": "",
                    "types": [
                      "lightning"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Ilusão Menor",
        "type": "spell",
        "_id": "56RvSmmJDeFkS0mm",
        "img": "icons/magic/symbols/star-yellow.webp",
        "system": {
          "description": {
            "value": "<p>Truque seguro: sons e imagens ilusórias.</p>",
            "chat": ""
          },
          "level": 0,
          "school": "ill",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "tEPdw3rVpSVdX1KO": {
              "_id": "tEPdw3rVpSVdX1KO",
              "type": "utility",
              "name": "Ilusão Menor",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "roll": {
                "name": "",
                "formula": "",
                "prompt": false,
                "visible": false
              }
            }
          }
        }
      },
      {
        "name": "Mísseis Mágicos",
        "type": "spell",
        "_id": "WfxPwvOpaCSz1HwK",
        "img": "icons/magic/light/projectiles-glow-purple.webp",
        "system": {
          "description": {
            "value": "<p>Dardos certeiros de pura força arcana.</p>",
            "chat": ""
          },
          "level": 1,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "xH8MLYYKX8hYOmoS": {
              "_id": "xH8MLYYKX8hYOmoS",
              "type": "utility",
              "name": "Mísseis Mágicos",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "roll": {
                "name": "",
                "formula": "",
                "prompt": false,
                "visible": false
              }
            }
          }
        }
      },
      {
        "name": "Escudo Arcano",
        "type": "spell",
        "_id": "quubhoVue51PF03B",
        "img": "icons/magic/defensive/barrier-shield-dome-blue.webp",
        "system": {
          "description": {
            "value": "<p>Barreira invisível que concede +5 na CA.</p>",
            "chat": ""
          },
          "level": 1,
          "school": "abj",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "QCD60ZesFuvJmQkt": {
              "_id": "QCD60ZesFuvJmQkt",
              "type": "utility",
              "name": "Escudo Arcano",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "roll": {
                "name": "",
                "formula": "",
                "prompt": false,
                "visible": false
              }
            }
          }
        }
      },
      {
        "name": "Orbe Cromática",
        "type": "spell",
        "_id": "ZYGOTy1jEcfucohH",
        "img": "icons/magic/symbols/star-multicolor-yellow-green.webp",
        "system": {
          "description": {
            "value": "<p>Orbe elementar personalizável.</p>",
            "chat": ""
          },
          "level": 1,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "vN7uUKUBTKVk2EIP": {
              "_id": "vN7uUKUBTKVk2EIP",
              "type": "attack",
              "name": "Orbe Cromática",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 18,
                "units": "m"
              },
              "attack": {
                "ability": "",
                "bonus": "",
                "critical": {
                  "threshold": null
                },
                "type": {
                  "classification": "spell",
                  "value": "ranged"
                }
              },
              "damage": {
                "parts": [
                  {
                    "number": 3,
                    "denomination": 8,
                    "bonus": "",
                    "types": [
                      "thunder"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Passo Nebuloso",
        "type": "spell",
        "_id": "jqnfH9cHhv54iQH5",
        "img": "icons/magic/movement/trail-streak-zigzag-blue.webp",
        "system": {
          "description": {
            "value": "<p>Teletransporte rápido de até 9m.</p>",
            "chat": ""
          },
          "level": 2,
          "school": "con",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "kRv8SPCTpTc9o2e2": {
              "_id": "kRv8SPCTpTc9o2e2",
              "type": "utility",
              "name": "Passo Nebuloso",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "roll": {
                "name": "",
                "formula": "",
                "prompt": false,
                "visible": false
              }
            }
          }
        }
      },
      {
        "name": "Raio Ardente",
        "type": "spell",
        "_id": "o8kZ5p4tAPEZN2Og",
        "img": "icons/magic/fire/beams-rays-orange-purple.webp",
        "system": {
          "description": {
            "value": "<p>Múltiplos raios de fogo intenso.</p>",
            "chat": ""
          },
          "level": 2,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "n01iHDGmESnlfLdU": {
              "_id": "n01iHDGmESnlfLdU",
              "type": "attack",
              "name": "Raio Ardente",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 18,
                "units": "m"
              },
              "attack": {
                "ability": "",
                "bonus": "",
                "critical": {
                  "threshold": null
                },
                "type": {
                  "classification": "spell",
                  "value": "ranged"
                }
              },
              "damage": {
                "parts": [
                  {
                    "number": 2,
                    "denomination": 6,
                    "bonus": "",
                    "types": [
                      "fire"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Bola de Fogo",
        "type": "spell",
        "_id": "IIbZ2zLASW6NIZF2",
        "img": "icons/magic/fire/explosion-fireball-orange-purple.webp",
        "system": {
          "description": {
            "value": "<p>Explosão clássica e devastadora de chamas.</p>",
            "chat": ""
          },
          "level": 3,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "uxyMyM9zEfytWeXw": {
              "_id": "uxyMyM9zEfytWeXw",
              "type": "save",
              "name": "Bola de Fogo",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "dex",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 8,
                    "denomination": 6,
                    "bonus": "",
                    "types": [
                      "fire"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Contra-Mágica",
        "type": "spell",
        "_id": "NmQT8hQZ2LIDu6YM",
        "img": "icons/magic/defensive/shield-barrier-blue.webp",
        "system": {
          "description": {
            "value": "<p>Interrompe o fluxo de magia do oponente.</p>",
            "chat": ""
          },
          "level": 3,
          "school": "abj",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "Gxme9WlomHZoZxBa": {
              "_id": "Gxme9WlomHZoZxBa",
              "type": "utility",
              "name": "Contra-Mágica",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "roll": {
                "name": "",
                "formula": "",
                "prompt": false,
                "visible": false
              }
            }
          }
        }
      },
      {
        "name": "Tempestade de Gelo",
        "type": "spell",
        "_id": "sVBqwMOfP0Z3dZnF",
        "img": "icons/magic/water/ice-shard-strike-blue.webp",
        "system": {
          "description": {
            "value": "<p>Granizo cortante e frio extremo em área.</p>",
            "chat": ""
          },
          "level": 4,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "OSk9Z7FPOOM0SKlD": {
              "_id": "OSk9Z7FPOOM0SKlD",
              "type": "save",
              "name": "Tempestade de Gelo",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "dex",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 5,
                    "denomination": 8,
                    "bonus": "",
                    "types": [
                      "cold"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Cone de Frio",
        "type": "spell",
        "_id": "KkQuhYHN2JVVFQFW",
        "img": "icons/magic/water/cone-ice-frost-white.webp",
        "system": {
          "description": {
            "value": "<p>Sopro ártico glacial de destruição.</p>",
            "chat": ""
          },
          "level": 5,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "2y4zR8WQ349w9Pdf": {
              "_id": "2y4zR8WQ349w9Pdf",
              "type": "save",
              "name": "Cone de Frio",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "con",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 8,
                    "denomination": 8,
                    "bonus": "",
                    "types": [
                      "cold"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Corrente de Relâmpagos",
        "type": "spell",
        "_id": "n1r8WsfLARHLGVOh",
        "img": "icons/magic/lightning/bolt-forked-blue.webp",
        "system": {
          "description": {
            "value": "<p>Relâmpago fulminante que salta entre 4 alvos.</p>",
            "chat": ""
          },
          "level": 6,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "Uhx8i1cmSrpAH77A": {
              "_id": "Uhx8i1cmSrpAH77A",
              "type": "save",
              "name": "Corrente de Relâmpagos",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "dex",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 10,
                    "denomination": 8,
                    "bonus": "",
                    "types": [
                      "lightning"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Bola de Fogo Controlada",
        "type": "spell",
        "_id": "K5m06K3O5u7rupBC",
        "img": "icons/magic/fire/explosion-sphere-glow-orange.webp",
        "system": {
          "description": {
            "value": "<p>Chamas acumuladas que detonam com força monumental.</p>",
            "chat": ""
          },
          "level": 7,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "oJslZR9Cg57SZYtS": {
              "_id": "oJslZR9Cg57SZYtS",
              "type": "save",
              "name": "Bola de Fogo Controlada",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "dex",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 12,
                    "denomination": 6,
                    "bonus": "",
                    "types": [
                      "fire"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Explosão Solar",
        "type": "spell",
        "_id": "e621aQg0aJafZNGB",
        "img": "icons/magic/fire/sun-burst-flare-yellow.webp",
        "system": {
          "description": {
            "value": "<p>Clarão brilhante como o sol causando cegueira e dano radiante.</p>",
            "chat": ""
          },
          "level": 8,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "yhSh8MaB8R9KCLPC": {
              "_id": "yhSh8MaB8R9KCLPC",
              "type": "save",
              "name": "Explosão Solar",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "con",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 12,
                    "denomination": 6,
                    "bonus": "",
                    "types": [
                      "radiant"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Chuva de Meteoros",
        "type": "spell",
        "_id": "dYQk16P7T2vZQl9u",
        "img": "icons/magic/fire/meteor-fireball-falling-red.webp",
        "system": {
          "description": {
            "value": "<p>Orbes flamejantes despencam dos céus aniquilando exércitos.</p>",
            "chat": ""
          },
          "level": 9,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "LjHLc1srwVNeyxEE": {
              "_id": "LjHLc1srwVNeyxEE",
              "type": "save",
              "name": "Chuva de Meteoros",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "dex",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 20,
                    "denomination": 6,
                    "bonus": "",
                    "types": [
                      "fire"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      }
    ],
    "effects": [],
    "folder": null,
    "ownership": {
      "default": 0
    },
    "flags": {
      "malha-arcana": {
        "corruption": 2
      }
    }
  },
  {
    "name": "Irmão Theron (Sumo Sacerdote Solar - Nível 17)",
    "type": "character",
    "_id": "m1rVNEt4k1oiGGpn",
    "img": "icons/characters/spellcasters/cleric-sun-priest-gold.webp",
    "system": {
      "currency": {
        "cp": 0,
        "sp": 0,
        "ep": 0,
        "gp": 5000,
        "pp": 100
      },
      "identifier": "theron-sumo-sacerdote",
      "abilities": {
        "str": {
          "value": 16,
          "proficient": 0
        },
        "dex": {
          "value": 10,
          "proficient": 0
        },
        "con": {
          "value": 18,
          "proficient": 1
        },
        "int": {
          "value": 12,
          "proficient": 0
        },
        "wis": {
          "value": 20,
          "proficient": 0
        },
        "cha": {
          "value": 14,
          "proficient": 0
        }
      },
      "attributes": {
        "ac": {
          "flat": 16,
          "calc": "default"
        },
        "hp": {
          "value": 136,
          "max": 136,
          "temp": 0,
          "tempmax": 0
        },
        "spellcasting": "wis",
        "prof": 6
      },
      "details": {
        "level": 17,
        "xp": {
          "value": 225000
        }
      },
      "resources": {
        "primary": {
          "value": 3,
          "max": 20,
          "label": "Corrupção",
          "sr": false,
          "lr": false
        },
        "secondary": {
          "value": 0,
          "max": 0,
          "label": "",
          "sr": false,
          "lr": false
        },
        "tertiary": {
          "value": 0,
          "max": 0,
          "label": "",
          "sr": false,
          "lr": false
        }
      },
      "spells": {
        "spell1": {
          "value": 4,
          "override": 4
        },
        "spell2": {
          "value": 3,
          "override": 3
        },
        "spell3": {
          "value": 3,
          "override": 3
        },
        "spell4": {
          "value": 3,
          "override": 3
        },
        "spell5": {
          "value": 2,
          "override": 2
        },
        "spell6": {
          "value": 1,
          "override": 1
        },
        "spell7": {
          "value": 1,
          "override": 1
        },
        "spell8": {
          "value": 1,
          "override": 1
        },
        "spell9": {
          "value": 1,
          "override": 1
        },
        "pact": {
          "value": 0,
          "override": null
        }
      }
    },
    "items": [
      {
        "_id": "RoYg7ppwxwA0Qu90",
        "name": "Clérigo",
        "type": "class",
        "img": "icons/magic/symbols/crest-shield-arcane-gold.webp",
        "system": {
          "identifier": "cleric",
          "levels": 17,
          "hd": {
            "denomination": "d8",
            "spent": 0
          },
          "spellcasting": {
            "progression": "full",
            "ability": "wis"
          }
        }
      },
      {
        "name": "Ação: Purgar a Malha",
        "type": "feat",
        "_id": "dWOmA1FzvP8LAp5t",
        "img": "icons/magic/light/explosion-star-glow-silhouette.webp",
        "system": {
          "description": {
            "value": "Uma ação para purgar a corrupção da Malha Arcana.",
            "chat": ""
          },
          "activities": {
            "wbuBozZYV6iUuZzX": {
              "_id": "wbuBozZYV6iUuZzX",
              "type": "utility",
              "activation": {
                "type": "action",
                "value": 1
              }
            }
          }
        }
      },
      {
        "name": "Chama Sagrada",
        "type": "spell",
        "_id": "NuyYrcsn9o0B6ei6",
        "img": "icons/magic/fire/flame-burning-radiance-sun.webp",
        "system": {
          "description": {
            "value": "<p>Luz pura cai sobre os inimigos.</p>",
            "chat": ""
          },
          "level": 0,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "gSnemiWhv9ujQTbj": {
              "_id": "gSnemiWhv9ujQTbj",
              "type": "save",
              "name": "Chama Sagrada",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "dex",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 4,
                    "denomination": 8,
                    "bonus": "",
                    "types": [
                      "radiant"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Guia",
        "type": "spell",
        "_id": "YRe0yq9tK4DPzx3o",
        "img": "icons/magic/light/hand-sparks-glow-yellow.webp",
        "system": {
          "description": {
            "value": "<p>Auxílio divino concedendo 1d4 num teste.</p>",
            "chat": ""
          },
          "level": 0,
          "school": "div",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "tiReOLJjKHvgHwph": {
              "_id": "tiReOLJjKHvgHwph",
              "type": "utility",
              "name": "Guia",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "roll": {
                "name": "",
                "formula": "",
                "prompt": false,
                "visible": false
              }
            }
          }
        }
      },
      {
        "name": "Toll the Dead",
        "type": "spell",
        "_id": "z7kIyL3ZfLRkeV5I",
        "img": "icons/magic/death/skull-energy-purple.webp",
        "system": {
          "description": {
            "value": "<p>Som fúnebre que atinge alvos feridos.</p>",
            "chat": ""
          },
          "level": 0,
          "school": "nec",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "0N5PffHp8TJv6HBB": {
              "_id": "0N5PffHp8TJv6HBB",
              "type": "save",
              "name": "Toll the Dead",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "wis",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 4,
                    "denomination": 12,
                    "bonus": "",
                    "types": [
                      "necrotic"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Curar Ferimentos",
        "type": "spell",
        "_id": "HK25Fm7UT1lVH5YL",
        "img": "icons/magic/life/cross-heart-green.webp",
        "system": {
          "description": {
            "value": "<p>Restaura a vida pelo toque divino.</p>",
            "chat": ""
          },
          "level": 1,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "zd4YplIsjebByDUE": {
              "_id": "zd4YplIsjebByDUE",
              "type": "heal",
              "name": "Curar Ferimentos",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "healing": {
                "number": 4,
                "denomination": 8,
                "bonus": "@mod + 10",
                "types": [
                  "healing"
                ],
                "scaling": {
                  "number": 1,
                  "denomination": 8
                }
              }
            }
          }
        }
      },
      {
        "name": "Raio Guiador",
        "type": "spell",
        "_id": "98OPOQQRHYzwwzTR",
        "img": "icons/magic/light/beam-strike-sky-blue.webp",
        "system": {
          "description": {
            "value": "<p>Feixe de luz radiante de alto dano.</p>",
            "chat": ""
          },
          "level": 1,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "c88WHfQyJpANoiJ2": {
              "_id": "c88WHfQyJpANoiJ2",
              "type": "attack",
              "name": "Raio Guiador",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 18,
                "units": "m"
              },
              "attack": {
                "ability": "",
                "bonus": "",
                "critical": {
                  "threshold": null
                },
                "type": {
                  "classification": "spell",
                  "value": "ranged"
                }
              },
              "damage": {
                "parts": [
                  {
                    "number": 4,
                    "denomination": 6,
                    "bonus": "",
                    "types": [
                      "radiant"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Bênção",
        "type": "spell",
        "_id": "oqTtz20Z073LTeTm",
        "img": "icons/magic/life/buff-strength-radiant-gold.webp",
        "system": {
          "description": {
            "value": "<p>Abençoa até 3 aliados em ataques e salvaguardas.</p>",
            "chat": ""
          },
          "level": 1,
          "school": "enc",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "LKH3Bwh243HmtoiZ": {
              "_id": "LKH3Bwh243HmtoiZ",
              "type": "utility",
              "name": "Bênção",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "roll": {
                "name": "",
                "formula": "",
                "prompt": false,
                "visible": false
              }
            }
          }
        }
      },
      {
        "name": "Arma Espiritual",
        "type": "spell",
        "_id": "VATLenmYx39IO3eo",
        "img": "icons/magic/light/hammer-glow-blue.webp",
        "system": {
          "description": {
            "value": "<p>Arma flutuante espectral radiante.</p>",
            "chat": ""
          },
          "level": 2,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "qXFoXu9p2eXCcgL3": {
              "_id": "qXFoXu9p2eXCcgL3",
              "type": "attack",
              "name": "Arma Espiritual",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 18,
                "units": "m"
              },
              "attack": {
                "ability": "",
                "bonus": "",
                "critical": {
                  "threshold": null
                },
                "type": {
                  "classification": "spell",
                  "value": "ranged"
                }
              },
              "damage": {
                "parts": [
                  {
                    "number": 2,
                    "denomination": 8,
                    "bonus": "",
                    "types": [
                      "force"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Espíritos Guardiões",
        "type": "spell",
        "_id": "PwTW1WDir9g5oET8",
        "img": "icons/magic/holy/angel-winged-glowing-yellow.webp",
        "system": {
          "description": {
            "value": "<p>Anjos de luz giram em torno causando destruição aos ímpios.</p>",
            "chat": ""
          },
          "level": 3,
          "school": "con",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "CtuQXiznSiOUdWCN": {
              "_id": "CtuQXiznSiOUdWCN",
              "type": "save",
              "name": "Espíritos Guardiões",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "wis",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 4,
                    "denomination": 8,
                    "bonus": "",
                    "types": [
                      "radiant"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Reviver",
        "type": "spell",
        "_id": "IV9RBaH0RkXm9MWd",
        "img": "icons/magic/life/ankh-gold.webp",
        "system": {
          "description": {
            "value": "<p>Devolve a vida a uma criatura morta recentemente.</p>",
            "chat": ""
          },
          "level": 3,
          "school": "nec",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "wuPhVPrauoIOlYEv": {
              "_id": "wuPhVPrauoIOlYEv",
              "type": "utility",
              "name": "Reviver",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "roll": {
                "name": "",
                "formula": "",
                "prompt": false,
                "visible": false
              }
            }
          }
        }
      },
      {
        "name": "Guardião da Fé",
        "type": "spell",
        "_id": "659zmbPafalwrcQq",
        "img": "icons/magic/holy/saint-glowing-gold.webp",
        "system": {
          "description": {
            "value": "<p>Um sentinela divino que ataca intrusos.</p>",
            "chat": ""
          },
          "level": 4,
          "school": "con",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "kE6FQ2Jrf0uyYSIY": {
              "_id": "kE6FQ2Jrf0uyYSIY",
              "type": "save",
              "name": "Guardião da Fé",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "dex",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 5,
                    "denomination": 8,
                    "bonus": "",
                    "types": [
                      "radiant"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Coluna de Chamas",
        "type": "spell",
        "_id": "X20kQh5TWLyfpzQW",
        "img": "icons/magic/fire/beam-pillar-flame-sun.webp",
        "system": {
          "description": {
            "value": "<p>Pilar de fogo divino que cai do céu.</p>",
            "chat": ""
          },
          "level": 5,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "iysK3YYX4Mu5c2sj": {
              "_id": "iysK3YYX4Mu5c2sj",
              "type": "save",
              "name": "Coluna de Chamas",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "dex",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 8,
                    "denomination": 6,
                    "bonus": "",
                    "types": [
                      "radiant"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Cura Completa",
        "type": "spell",
        "_id": "Alv6u1upKylJtMCI",
        "img": "icons/magic/life/heart-glowing-green.webp",
        "system": {
          "description": {
            "value": "<p>Inunda o alvo com 70 pontos de cura imediata.</p>",
            "chat": ""
          },
          "level": 6,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "sjfk60YtwKc5y7II": {
              "_id": "sjfk60YtwKc5y7II",
              "type": "heal",
              "name": "Cura Completa",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "healing": {
                "number": 10,
                "denomination": 8,
                "bonus": "@mod + 10",
                "types": [
                  "healing"
                ],
                "scaling": {
                  "number": 1,
                  "denomination": 8
                }
              }
            }
          }
        }
      },
      {
        "name": "Tempestade de Fogo",
        "type": "spell",
        "_id": "KZ1Jq7CzV1snlYQA",
        "img": "icons/magic/fire/storm-blaze-smoke-orange.webp",
        "system": {
          "description": {
            "value": "<p>Cortina de fogo celestial consumindo a terra.</p>",
            "chat": ""
          },
          "level": 7,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "PdIQQotTlcIU6gP7": {
              "_id": "PdIQQotTlcIU6gP7",
              "type": "save",
              "name": "Tempestade de Fogo",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "dex",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 10,
                    "denomination": 10,
                    "bonus": "",
                    "types": [
                      "fire"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Terremoto Sagrado",
        "type": "spell",
        "_id": "3wh7yswRswxAPfe7",
        "img": "icons/magic/earth/fissure-cracked-ground-red.webp",
        "system": {
          "description": {
            "value": "<p>A fúria dos deuses rasga a terra.</p>",
            "chat": ""
          },
          "level": 8,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "xo9JMaaWpqWwovL6": {
              "_id": "xo9JMaaWpqWwovL6",
              "type": "save",
              "name": "Terremoto Sagrado",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "dex",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 10,
                    "denomination": 6,
                    "bonus": "",
                    "types": [
                      "bludgeoning"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Cura em Massa",
        "type": "spell",
        "_id": "67VKoY0AjHNZvCi9",
        "img": "icons/magic/life/cross-beam-radiant-gold.webp",
        "system": {
          "description": {
            "value": "<p>Restaura até 700 pontos de vida divididos entre aliados.</p>",
            "chat": ""
          },
          "level": 9,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "cYypZOGfCMW3YIv0": {
              "_id": "cYypZOGfCMW3YIv0",
              "type": "heal",
              "name": "Cura em Massa",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "healing": {
                "number": 20,
                "denomination": 8,
                "bonus": "@mod + 10",
                "types": [
                  "healing"
                ],
                "scaling": {
                  "number": 1,
                  "denomination": 8
                }
              }
            }
          }
        }
      }
    ],
    "effects": [],
    "folder": null,
    "ownership": {
      "default": 0
    },
    "flags": {
      "malha-arcana": {
        "corruption": 3
      }
    }
  },
  {
    "name": "Morgath o Flagelo Cósmico (Bruxo Ancião - Nível 17)",
    "type": "character",
    "_id": "thaFYX0eEbQMnHlZ",
    "img": "icons/characters/spellcasters/warlock-tentacles-shadow-green.webp",
    "system": {
      "currency": {
        "cp": 0,
        "sp": 0,
        "ep": 0,
        "gp": 5000,
        "pp": 100
      },
      "identifier": "morgath-arqui-bruxo",
      "abilities": {
        "str": {
          "value": 10,
          "proficient": 0
        },
        "dex": {
          "value": 16,
          "proficient": 0
        },
        "con": {
          "value": 18,
          "proficient": 1
        },
        "int": {
          "value": 14,
          "proficient": 0
        },
        "wis": {
          "value": 12,
          "proficient": 0
        },
        "cha": {
          "value": 20,
          "proficient": 0
        }
      },
      "attributes": {
        "ac": {
          "flat": 16,
          "calc": "default"
        },
        "hp": {
          "value": 128,
          "max": 128,
          "temp": 0,
          "tempmax": 0
        },
        "spellcasting": "cha",
        "prof": 6
      },
      "details": {
        "level": 17,
        "xp": {
          "value": 225000
        }
      },
      "resources": {
        "primary": {
          "value": 8,
          "max": 20,
          "label": "Corrupção",
          "sr": false,
          "lr": false
        },
        "secondary": {
          "value": 0,
          "max": 0,
          "label": "",
          "sr": false,
          "lr": false
        },
        "tertiary": {
          "value": 0,
          "max": 0,
          "label": "",
          "sr": false,
          "lr": false
        }
      },
      "spells": {
        "spell1": {
          "value": 0,
          "override": null
        },
        "spell2": {
          "value": 0,
          "override": null
        },
        "spell3": {
          "value": 0,
          "override": null
        },
        "spell4": {
          "value": 0,
          "override": null
        },
        "spell5": {
          "value": 0,
          "override": null
        },
        "spell6": {
          "value": 1,
          "override": 1
        },
        "spell7": {
          "value": 1,
          "override": 1
        },
        "spell8": {
          "value": 1,
          "override": 1
        },
        "spell9": {
          "value": 1,
          "override": 1
        },
        "pact": {
          "value": 4,
          "override": 4
        }
      }
    },
    "items": [
      {
        "_id": "76VgIT21ezmuxckS",
        "name": "Bruxo",
        "type": "class",
        "img": "icons/magic/symbols/crest-shield-arcane-gold.webp",
        "system": {
          "identifier": "warlock",
          "levels": 17,
          "hd": {
            "denomination": "d8",
            "spent": 0
          },
          "spellcasting": {
            "progression": "pact",
            "ability": "cha"
          }
        }
      },
      {
        "name": "Ação: Purgar a Malha",
        "type": "feat",
        "_id": "4amp0cCuMagVueS1",
        "img": "icons/magic/light/explosion-star-glow-silhouette.webp",
        "system": {
          "description": {
            "value": "Uma ação para purgar a corrupção da Malha Arcana.",
            "chat": ""
          },
          "activities": {
            "eUNWclPfq1VVbTSl": {
              "_id": "eUNWclPfq1VVbTSl",
              "type": "utility",
              "activation": {
                "type": "action",
                "value": 1
              }
            }
          }
        }
      },
      {
        "name": "Disparo Místico",
        "type": "spell",
        "_id": "VHvPrxEGj4tOD2ps",
        "img": "icons/magic/unholy/beam-impact-purple.webp",
        "system": {
          "description": {
            "value": "<p>Dispara 4 feixes de puro poder místico cósmico.</p>",
            "chat": ""
          },
          "level": 0,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "R5ekgctZGz5Tr6mf": {
              "_id": "R5ekgctZGz5Tr6mf",
              "type": "attack",
              "name": "Disparo Místico",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 18,
                "units": "m"
              },
              "attack": {
                "ability": "",
                "bonus": "",
                "critical": {
                  "threshold": null
                },
                "type": {
                  "classification": "spell",
                  "value": "ranged"
                }
              },
              "damage": {
                "parts": [
                  {
                    "number": 4,
                    "denomination": 10,
                    "bonus": "",
                    "types": [
                      "force"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Rajada Venenosa",
        "type": "spell",
        "_id": "drCrm5YLdK4ZQ1Xe",
        "img": "icons/magic/nature/cloud-poison-green.webp",
        "system": {
          "description": {
            "value": "<p>Névoa ácida do vácuo.</p>",
            "chat": ""
          },
          "level": 0,
          "school": "con",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "3s1tZ7pToKs5zp7f": {
              "_id": "3s1tZ7pToKs5zp7f",
              "type": "save",
              "name": "Rajada Venenosa",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "con",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 4,
                    "denomination": 12,
                    "bonus": "",
                    "types": [
                      "poison"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Braços de Hadar",
        "type": "spell",
        "_id": "NCwVRaI2UAsgJCV6",
        "img": "icons/magic/unholy/tentacles-black-purple.webp",
        "system": {
          "description": {
            "value": "<p>Tentáculos escuros e gélidos.</p>",
            "chat": ""
          },
          "level": 1,
          "school": "con",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "Qfa3D5hLkgmLVIZt": {
              "_id": "Qfa3D5hLkgmLVIZt",
              "type": "save",
              "name": "Braços de Hadar",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "str",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 4,
                    "denomination": 6,
                    "bonus": "",
                    "types": [
                      "necrotic"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Repreensão Infernal",
        "type": "spell",
        "_id": "NKCbl7PM5Su5qKi5",
        "img": "icons/magic/fire/flame-burning-hellfire-red.webp",
        "system": {
          "description": {
            "value": "<p>Chamas retaliatórias imediatas.</p>",
            "chat": ""
          },
          "level": 1,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "lLqxVwj5JK1dmRFH": {
              "_id": "lLqxVwj5JK1dmRFH",
              "type": "save",
              "name": "Repreensão Infernal",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "dex",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 5,
                    "denomination": 10,
                    "bonus": "",
                    "types": [
                      "fire"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Passo Nebuloso",
        "type": "spell",
        "_id": "iEHH1zQnWNQr3HFK",
        "img": "icons/magic/movement/trail-streak-zigzag-blue.webp",
        "system": {
          "description": {
            "value": "<p>Mergulha pelas sombras reaparecendo à distância.</p>",
            "chat": ""
          },
          "level": 2,
          "school": "con",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "7DjOIzkNR4gKZnQp": {
              "_id": "7DjOIzkNR4gKZnQp",
              "type": "utility",
              "name": "Passo Nebuloso",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "roll": {
                "name": "",
                "formula": "",
                "prompt": false,
                "visible": false
              }
            }
          }
        }
      },
      {
        "name": "Escuridão",
        "type": "spell",
        "_id": "sNUuXfQQotJicH67",
        "img": "icons/magic/unholy/silhouette-robe-evil-power.webp",
        "system": {
          "description": {
            "value": "<p>Trevas mágicas intransponíveis.</p>",
            "chat": ""
          },
          "level": 2,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "H7KkR9DUryogqMtE": {
              "_id": "H7KkR9DUryogqMtE",
              "type": "utility",
              "name": "Escuridão",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "roll": {
                "name": "",
                "formula": "",
                "prompt": false,
                "visible": false
              }
            }
          }
        }
      },
      {
        "name": "Fome de Hadar",
        "type": "spell",
        "_id": "IUCqnBjWzbqjmrng",
        "img": "icons/magic/unholy/vortex-portal-void-black.webp",
        "system": {
          "description": {
            "value": "<p>Vórtice do vácuo cósmico com frio cortante e ácido.</p>",
            "chat": ""
          },
          "level": 3,
          "school": "con",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "ZBdMaQBLIRnjJuK5": {
              "_id": "ZBdMaQBLIRnjJuK5",
              "type": "save",
              "name": "Fome de Hadar",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "dex",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 4,
                    "denomination": 6,
                    "bonus": "",
                    "types": [
                      "cold"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Toque Vampírico",
        "type": "spell",
        "_id": "BBSnT7vOjHdwpgrH",
        "img": "icons/magic/unholy/hand-grasping-shadow-black.webp",
        "system": {
          "description": {
            "value": "<p>Drena a vida do alvo para alimentar o bruxo.</p>",
            "chat": ""
          },
          "level": 3,
          "school": "nec",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "6odcN6aeh0E7AoyF": {
              "_id": "6odcN6aeh0E7AoyF",
              "type": "attack",
              "name": "Toque Vampírico",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 18,
                "units": "m"
              },
              "attack": {
                "ability": "",
                "bonus": "",
                "critical": {
                  "threshold": null
                },
                "type": {
                  "classification": "spell",
                  "value": "ranged"
                }
              },
              "damage": {
                "parts": [
                  {
                    "number": 5,
                    "denomination": 6,
                    "bonus": "",
                    "types": [
                      "necrotic"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Porta Dimensional",
        "type": "spell",
        "_id": "ypNsGl8Y41BU1AyJ",
        "img": "icons/magic/movement/portal-vortex-purple.webp",
        "system": {
          "description": {
            "value": "<p>Abre um túnel no espaço para se teleportar até 150m.</p>",
            "chat": ""
          },
          "level": 4,
          "school": "con",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "qxq8jaXA62U3lb01": {
              "_id": "qxq8jaXA62U3lb01",
              "type": "utility",
              "name": "Porta Dimensional",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "roll": {
                "name": "",
                "formula": "",
                "prompt": false,
                "visible": false
              }
            }
          }
        }
      },
      {
        "name": "Muralha de Fogo",
        "type": "spell",
        "_id": "Xu0MuIYBFLLLMddm",
        "img": "icons/magic/fire/wall-fire-blaze-orange.webp",
        "system": {
          "description": {
            "value": "<p>Cortina infernal ardente.</p>",
            "chat": ""
          },
          "level": 4,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "aPxvAP5w8iHMakiB": {
              "_id": "aPxvAP5w8iHMakiB",
              "type": "save",
              "name": "Muralha de Fogo",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "dex",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 6,
                    "denomination": 8,
                    "bonus": "",
                    "types": [
                      "fire"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Círculo Telepático",
        "type": "spell",
        "_id": "rixNwzgAQA8sCFZK",
        "img": "icons/magic/perception/eye-tendrils-purple.webp",
        "system": {
          "description": {
            "value": "<p>Conecta as mentes do grupo através do éter.</p>",
            "chat": ""
          },
          "level": 5,
          "school": "div",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "KbmYO0H2WhLuzZ8S": {
              "_id": "KbmYO0H2WhLuzZ8S",
              "type": "utility",
              "name": "Círculo Telepático",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "roll": {
                "name": "",
                "formula": "",
                "prompt": false,
                "visible": false
              }
            }
          }
        }
      },
      {
        "name": "Círculo da Morte",
        "type": "spell",
        "_id": "MuISpski6xgVH8lL",
        "img": "icons/magic/unholy/explosion-necrotic-skulls-black.webp",
        "system": {
          "description": {
            "value": "<p>Esfera devastadora de energia necrótica.</p>",
            "chat": ""
          },
          "level": 6,
          "school": "nec",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "ppQmkFsDJJyTeGDu": {
              "_id": "ppQmkFsDJJyTeGDu",
              "type": "save",
              "name": "Círculo da Morte",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "con",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 8,
                    "denomination": 8,
                    "bonus": "",
                    "types": [
                      "necrotic"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Dedo da Morte",
        "type": "spell",
        "_id": "hpthVxPqyxQ0THx3",
        "img": "icons/magic/death/hand-decay-energy-purple.webp",
        "system": {
          "description": {
            "value": "<p>Energia letal que ergue o alvo como zumbi se matá-lo.</p>",
            "chat": ""
          },
          "level": 7,
          "school": "nec",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "8ej7lZyfj5roHZ7U": {
              "_id": "8ej7lZyfj5roHZ7U",
              "type": "save",
              "name": "Dedo da Morte",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "con",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 9,
                    "denomination": 8,
                    "bonus": "",
                    "types": [
                      "necrotic"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Semiplano",
        "type": "spell",
        "_id": "kwNf23uOq0VFVbH3",
        "img": "icons/magic/symbols/door-portal-glowing-gold.webp",
        "system": {
          "description": {
            "value": "<p>Abre uma porta para seu próprio reino pessoal nas estrelas.</p>",
            "chat": ""
          },
          "level": 8,
          "school": "con",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "JRUboQSLzkklh4Fv": {
              "_id": "JRUboQSLzkklh4Fv",
              "type": "utility",
              "name": "Semiplano",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "roll": {
                "name": "",
                "formula": "",
                "prompt": false,
                "visible": false
              }
            }
          }
        }
      },
      {
        "name": "Lâmina da Aniquilação",
        "type": "spell",
        "_id": "Ap7mxc7BgADQhvsw",
        "img": "icons/magic/unholy/beam-black-lightning-purple.webp",
        "system": {
          "description": {
            "value": "<p>O poder bruto do Grande Antigo rasga a realidade.</p>",
            "chat": ""
          },
          "level": 9,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "i1XbOLybYElUhy5W": {
              "_id": "i1XbOLybYElUhy5W",
              "type": "save",
              "name": "Lâmina da Aniquilação",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "con",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 14,
                    "denomination": 10,
                    "bonus": "",
                    "types": [
                      "force"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      }
    ],
    "effects": [],
    "folder": null,
    "ownership": {
      "default": 0
    },
    "flags": {
      "malha-arcana": {
        "corruption": 8
      }
    }
  },
  {
    "name": "Lyra das Cordas Eternas (Barda Celestial - Nível 16)",
    "type": "character",
    "_id": "GcLkxjzKs30P5UJh",
    "img": "icons/characters/spellcasters/bard-lute-song-magic-blue.webp",
    "system": {
      "currency": {
        "cp": 0,
        "sp": 0,
        "ep": 0,
        "gp": 5000,
        "pp": 100
      },
      "identifier": "lyra-virtuosa-celestial",
      "abilities": {
        "str": {
          "value": 10,
          "proficient": 0
        },
        "dex": {
          "value": 18,
          "proficient": 0
        },
        "con": {
          "value": 16,
          "proficient": 1
        },
        "int": {
          "value": 14,
          "proficient": 0
        },
        "wis": {
          "value": 14,
          "proficient": 0
        },
        "cha": {
          "value": 20,
          "proficient": 0
        }
      },
      "attributes": {
        "ac": {
          "flat": 16,
          "calc": "default"
        },
        "hp": {
          "value": 112,
          "max": 112,
          "temp": 0,
          "tempmax": 0
        },
        "spellcasting": "cha",
        "prof": 6
      },
      "details": {
        "level": 16,
        "xp": {
          "value": 225000
        }
      },
      "resources": {
        "primary": {
          "value": 4,
          "max": 20,
          "label": "Corrupção",
          "sr": false,
          "lr": false
        },
        "secondary": {
          "value": 0,
          "max": 0,
          "label": "",
          "sr": false,
          "lr": false
        },
        "tertiary": {
          "value": 0,
          "max": 0,
          "label": "",
          "sr": false,
          "lr": false
        }
      },
      "spells": {
        "spell1": {
          "value": 4,
          "override": 4
        },
        "spell2": {
          "value": 3,
          "override": 3
        },
        "spell3": {
          "value": 3,
          "override": 3
        },
        "spell4": {
          "value": 3,
          "override": 3
        },
        "spell5": {
          "value": 2,
          "override": 2
        },
        "spell6": {
          "value": 1,
          "override": 1
        },
        "spell7": {
          "value": 1,
          "override": 1
        },
        "spell8": {
          "value": 1,
          "override": 1
        },
        "spell9": {
          "value": 1,
          "override": 1
        },
        "pact": {
          "value": 0,
          "override": null
        }
      }
    },
    "items": [
      {
        "_id": "qL51fu8NvnndzB0N",
        "name": "Bardo",
        "type": "class",
        "img": "icons/magic/symbols/crest-shield-arcane-gold.webp",
        "system": {
          "identifier": "bard",
          "levels": 17,
          "hd": {
            "denomination": "d8",
            "spent": 0
          },
          "spellcasting": {
            "progression": "full",
            "ability": "cha"
          }
        }
      },
      {
        "name": "Ação: Purgar a Malha",
        "type": "feat",
        "_id": "Dp5Ngz0Ik0NDPM2A",
        "img": "icons/magic/light/explosion-star-glow-silhouette.webp",
        "system": {
          "description": {
            "value": "Uma ação para purgar a corrupção da Malha Arcana.",
            "chat": ""
          },
          "activities": {
            "bxiEPggHp4UtQXd5": {
              "_id": "bxiEPggHp4UtQXd5",
              "type": "utility",
              "activation": {
                "type": "action",
                "value": 1
              }
            }
          }
        }
      },
      {
        "name": "Zombaria Viciosa",
        "type": "spell",
        "_id": "57ULLnbLS5N35hjL",
        "img": "icons/magic/sonic/scream-face-purple.webp",
        "system": {
          "description": {
            "value": "<p>Insultos penetrantes com reverberação mágica.</p>",
            "chat": ""
          },
          "level": 0,
          "school": "enc",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "KCI20Jbv4ujuSpjq": {
              "_id": "KCI20Jbv4ujuSpjq",
              "type": "save",
              "name": "Zombaria Viciosa",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "wis",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 4,
                    "denomination": 4,
                    "bonus": "",
                    "types": [
                      "psychic"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Luzes Dançantes",
        "type": "spell",
        "_id": "82j4j0kzX4QA449P",
        "img": "icons/magic/light/balls-floating-yellow.webp",
        "system": {
          "description": {
            "value": "<p>Tochas espectrais flutuantes.</p>",
            "chat": ""
          },
          "level": 0,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "A2SSrj6YKaMi8g9r": {
              "_id": "A2SSrj6YKaMi8g9r",
              "type": "utility",
              "name": "Luzes Dançantes",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "roll": {
                "name": "",
                "formula": "",
                "prompt": false,
                "visible": false
              }
            }
          }
        }
      },
      {
        "name": "Sussurros Dissonantes",
        "type": "spell",
        "_id": "WdUqaF2XPTzaz11W",
        "img": "icons/magic/sonic/music-note-vibration-purple.webp",
        "system": {
          "description": {
            "value": "<p>Canção que distorce a mente e força fuga.</p>",
            "chat": ""
          },
          "level": 1,
          "school": "enc",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "HA4TQCymMR0EliVh": {
              "_id": "HA4TQCymMR0EliVh",
              "type": "save",
              "name": "Sussurros Dissonantes",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "wis",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 5,
                    "denomination": 6,
                    "bonus": "",
                    "types": [
                      "psychic"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Palavra Curativa",
        "type": "spell",
        "_id": "jdXUwfc5qSULoZZk",
        "img": "icons/magic/life/heart-hand-gold.webp",
        "system": {
          "description": {
            "value": "<p>Cura harmônica instantânea à distância.</p>",
            "chat": ""
          },
          "level": 1,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "g1Rgn61Ub9bnbjh6": {
              "_id": "g1Rgn61Ub9bnbjh6",
              "type": "heal",
              "name": "Palavra Curativa",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "healing": {
                "number": 3,
                "denomination": 4,
                "bonus": "@mod + 10",
                "types": [
                  "healing"
                ],
                "scaling": {
                  "number": 1,
                  "denomination": 8
                }
              }
            }
          }
        }
      },
      {
        "name": "Estilhaçar",
        "type": "spell",
        "_id": "T59tiyesv118AeDy",
        "img": "icons/magic/sonic/sound-wave-shatter-blue.webp",
        "system": {
          "description": {
            "value": "<p>Ondas sonoras destruidoras de matéria.</p>",
            "chat": ""
          },
          "level": 2,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "V6sRDw9PDKGz9SMc": {
              "_id": "V6sRDw9PDKGz9SMc",
              "type": "save",
              "name": "Estilhaçar",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "con",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 5,
                    "denomination": 8,
                    "bonus": "",
                    "types": [
                      "thunder"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Sugestão",
        "type": "spell",
        "_id": "664QQhA1S2Z4e63M",
        "img": "icons/magic/control/hypnosis-mesmerism-swirl.webp",
        "system": {
          "description": {
            "value": "<p>Planta um curso de ação na mente do alvo.</p>",
            "chat": ""
          },
          "level": 2,
          "school": "enc",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "8G1MVKZjnrzPPEEk": {
              "_id": "8G1MVKZjnrzPPEEk",
              "type": "save",
              "name": "Sugestão",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "wis",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 0,
                    "denomination": 0,
                    "bonus": "",
                    "types": [
                      ""
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Padrão Hipnótico",
        "type": "spell",
        "_id": "7QzF2Kd6xXdnb3Ma",
        "img": "icons/magic/control/hypnosis-spiral-rainbow.webp",
        "system": {
          "description": {
            "value": "<p>Padrão de cores que incapacita inimigos.</p>",
            "chat": ""
          },
          "level": 3,
          "school": "ill",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "uWFBrMPTTKzRTveT": {
              "_id": "uWFBrMPTTKzRTveT",
              "type": "save",
              "name": "Padrão Hipnótico",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "wis",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 0,
                    "denomination": 0,
                    "bonus": "",
                    "types": [
                      ""
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Dissipar Magia",
        "type": "spell",
        "_id": "4V2lC2mh3aJ4R110",
        "img": "icons/magic/defensive/shield-barrier-blue.webp",
        "system": {
          "description": {
            "value": "<p>Cessa feitiços em vigor no ambiente.</p>",
            "chat": ""
          },
          "level": 3,
          "school": "abj",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "S2XI11phbBHnqva9": {
              "_id": "S2XI11phbBHnqva9",
              "type": "utility",
              "name": "Dissipar Magia",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "roll": {
                "name": "",
                "formula": "",
                "prompt": false,
                "visible": false
              }
            }
          }
        }
      },
      {
        "name": "Metamorfose",
        "type": "spell",
        "_id": "SQpZUC7qcIda0ZBx",
        "img": "icons/magic/nature/wolf-howl-moon-blue.webp",
        "system": {
          "description": {
            "value": "<p>Transforma um aliado ou inimigo em uma fera lendária.</p>",
            "chat": ""
          },
          "level": 4,
          "school": "trs",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "yR0oJQnGi4RoHWDU": {
              "_id": "yR0oJQnGi4RoHWDU",
              "type": "save",
              "name": "Metamorfose",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "wis",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 0,
                    "denomination": 0,
                    "bonus": "",
                    "types": [
                      ""
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Modificar Memória",
        "type": "spell",
        "_id": "ahqOUx4Jhm5TLgHh",
        "img": "icons/magic/perception/mind-brain-synapses-purple.webp",
        "system": {
          "description": {
            "value": "<p>Reescreve lembranças da mente do alvo.</p>",
            "chat": ""
          },
          "level": 5,
          "school": "enc",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "ZcATDiUdI6ppt1vu": {
              "_id": "ZcATDiUdI6ppt1vu",
              "type": "save",
              "name": "Modificar Memória",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "wis",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 0,
                    "denomination": 0,
                    "bonus": "",
                    "types": [
                      ""
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Dança Irresistível de Otto",
        "type": "spell",
        "_id": "ZODKRrMCd0uepcuS",
        "img": "icons/magic/movement/feet-dancing-shoes-gold.webp",
        "system": {
          "description": {
            "value": "<p>Força o alvo a dançar comicamente e sem controle.</p>",
            "chat": ""
          },
          "level": 6,
          "school": "enc",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "NWNBjnq8veViVnfj": {
              "_id": "NWNBjnq8veViVnfj",
              "type": "save",
              "name": "Dança Irresistível de Otto",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "wis",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 0,
                    "denomination": 0,
                    "bonus": "",
                    "types": [
                      ""
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Espada de Mordenkainen",
        "type": "spell",
        "_id": "AonTUVwkO5OfSBpx",
        "img": "icons/weapons/swords/sword-broad-glowing-gold.webp",
        "system": {
          "description": {
            "value": "<p>Uma lâmina radiante luminosa que golpeia os alvos.</p>",
            "chat": ""
          },
          "level": 7,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "4WWtQM4eWu2B7psg": {
              "_id": "4WWtQM4eWu2B7psg",
              "type": "attack",
              "name": "Espada de Mordenkainen",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 18,
                "units": "m"
              },
              "attack": {
                "ability": "",
                "bonus": "",
                "critical": {
                  "threshold": null
                },
                "type": {
                  "classification": "spell",
                  "value": "ranged"
                }
              },
              "damage": {
                "parts": [
                  {
                    "number": 5,
                    "denomination": 10,
                    "bonus": "",
                    "types": [
                      "force"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Dominar Monstro",
        "type": "spell",
        "_id": "vQc80qI3vpi0eYkO",
        "img": "icons/magic/control/control-influence-puppet-purple.webp",
        "system": {
          "description": {
            "value": "<p>Domina completamente a vontade de qualquer criatura.</p>",
            "chat": ""
          },
          "level": 8,
          "school": "enc",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "YsqnrIYIrWnN1O3S": {
              "_id": "YsqnrIYIrWnN1O3S",
              "type": "save",
              "name": "Dominar Monstro",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "wis",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 0,
                    "denomination": 0,
                    "bonus": "",
                    "types": [
                      ""
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      }
    ],
    "effects": [],
    "folder": null,
    "ownership": {
      "default": 0
    },
    "flags": {
      "malha-arcana": {
        "corruption": 4
      }
    }
  },
  {
    "name": "Kaelen Chama-Primordial (Feiticeiro Dracônico - Nível 17)",
    "type": "character",
    "_id": "JKRBFZw0eP7fhEMV",
    "img": "icons/characters/spellcasters/sorcerer-chaos-eyes-fire-orange.webp",
    "system": {
      "currency": {
        "cp": 0,
        "sp": 0,
        "ep": 0,
        "gp": 5000,
        "pp": 100
      },
      "identifier": "kaelen-senhor-cataclismo",
      "abilities": {
        "str": {
          "value": 12,
          "proficient": 0
        },
        "dex": {
          "value": 16,
          "proficient": 0
        },
        "con": {
          "value": 18,
          "proficient": 1
        },
        "int": {
          "value": 10,
          "proficient": 0
        },
        "wis": {
          "value": 12,
          "proficient": 0
        },
        "cha": {
          "value": 20,
          "proficient": 0
        }
      },
      "attributes": {
        "ac": {
          "flat": 16,
          "calc": "default"
        },
        "hp": {
          "value": 130,
          "max": 130,
          "temp": 0,
          "tempmax": 0
        },
        "spellcasting": "cha",
        "prof": 6
      },
      "details": {
        "level": 17,
        "xp": {
          "value": 225000
        }
      },
      "resources": {
        "primary": {
          "value": 14,
          "max": 20,
          "label": "Corrupção",
          "sr": false,
          "lr": false
        },
        "secondary": {
          "value": 0,
          "max": 0,
          "label": "",
          "sr": false,
          "lr": false
        },
        "tertiary": {
          "value": 0,
          "max": 0,
          "label": "",
          "sr": false,
          "lr": false
        }
      },
      "spells": {
        "spell1": {
          "value": 4,
          "override": 4
        },
        "spell2": {
          "value": 3,
          "override": 3
        },
        "spell3": {
          "value": 3,
          "override": 3
        },
        "spell4": {
          "value": 3,
          "override": 3
        },
        "spell5": {
          "value": 2,
          "override": 2
        },
        "spell6": {
          "value": 1,
          "override": 1
        },
        "spell7": {
          "value": 1,
          "override": 1
        },
        "spell8": {
          "value": 1,
          "override": 1
        },
        "spell9": {
          "value": 1,
          "override": 1
        },
        "pact": {
          "value": 0,
          "override": null
        }
      }
    },
    "items": [
      {
        "_id": "GLHiOWq4CEHSwKdf",
        "name": "Feiticeiro",
        "type": "class",
        "img": "icons/magic/symbols/crest-shield-arcane-gold.webp",
        "system": {
          "identifier": "sorcerer",
          "levels": 17,
          "hd": {
            "denomination": "d6",
            "spent": 0
          },
          "spellcasting": {
            "progression": "full",
            "ability": "cha"
          }
        }
      },
      {
        "name": "Ação: Purgar a Malha",
        "type": "feat",
        "_id": "aL8fe1ztUBmVXs6l",
        "img": "icons/magic/light/explosion-star-glow-silhouette.webp",
        "system": {
          "description": {
            "value": "Uma ação para purgar a corrupção da Malha Arcana.",
            "chat": ""
          },
          "activities": {
            "7WTE6bO2mmcsmICI": {
              "_id": "7WTE6bO2mmcsmICI",
              "type": "utility",
              "activation": {
                "type": "action",
                "value": 1
              }
            }
          }
        }
      },
      {
        "name": "Rajada de Fogo Dracônica",
        "type": "spell",
        "_id": "J6pn0NOpaFBrfccg",
        "img": "icons/magic/fire/beam-jet-stream-yellow.webp",
        "system": {
          "description": {
            "value": "<p>Chamas cuspem da alma do dragão vermelho.</p>",
            "chat": ""
          },
          "level": 0,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "fwQnwCPOLlSXWO16": {
              "_id": "fwQnwCPOLlSXWO16",
              "type": "attack",
              "name": "Rajada de Fogo Dracônica",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 18,
                "units": "m"
              },
              "attack": {
                "ability": "",
                "bonus": "",
                "critical": {
                  "threshold": null
                },
                "type": {
                  "classification": "spell",
                  "value": "ranged"
                }
              },
              "damage": {
                "parts": [
                  {
                    "number": 4,
                    "denomination": 10,
                    "bonus": "",
                    "types": [
                      "fire"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Raio de Gelo",
        "type": "spell",
        "_id": "Vll5SksQD1nEarvR",
        "img": "icons/magic/water/ice-shard-strike-blue.webp",
        "system": {
          "description": {
            "value": "<p>Feixe azul glacial que reduz o movimento.</p>",
            "chat": ""
          },
          "level": 0,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "aXbs49I2HLDMT3TP": {
              "_id": "aXbs49I2HLDMT3TP",
              "type": "attack",
              "name": "Raio de Gelo",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 18,
                "units": "m"
              },
              "attack": {
                "ability": "",
                "bonus": "",
                "critical": {
                  "threshold": null
                },
                "type": {
                  "classification": "spell",
                  "value": "ranged"
                }
              },
              "damage": {
                "parts": [
                  {
                    "number": 4,
                    "denomination": 8,
                    "bonus": "",
                    "types": [
                      "cold"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Mãos Flamejantes",
        "type": "spell",
        "_id": "RNETTBsqBSwMSnsm",
        "img": "icons/magic/fire/cone-fire-orange.webp",
        "system": {
          "description": {
            "value": "<p>Cone amplo de fogo incandescente.</p>",
            "chat": ""
          },
          "level": 1,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "YBGYJaRZsz3ZRyjY": {
              "_id": "YBGYJaRZsz3ZRyjY",
              "type": "save",
              "name": "Mãos Flamejantes",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "dex",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 6,
                    "denomination": 6,
                    "bonus": "",
                    "types": [
                      "fire"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Queda Suave",
        "type": "spell",
        "_id": "WaCMi2ZFuj9tp4Kj",
        "img": "icons/magic/movement/feather-falling-purple.webp",
        "system": {
          "description": {
            "value": "<p>Retarda a descida de corpos em queda.</p>",
            "chat": ""
          },
          "level": 1,
          "school": "trs",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "GT9oeA3hEnoDJ7L6": {
              "_id": "GT9oeA3hEnoDJ7L6",
              "type": "utility",
              "name": "Queda Suave",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "roll": {
                "name": "",
                "formula": "",
                "prompt": false,
                "visible": false
              }
            }
          }
        }
      },
      {
        "name": "Despedaçar Chamas",
        "type": "spell",
        "_id": "dg9p4x9QuAFgETKT",
        "img": "icons/magic/fire/projectile-fireball-smoke-orange.webp",
        "system": {
          "description": {
            "value": "<p>Arremesso concentrado de lava pura.</p>",
            "chat": ""
          },
          "level": 2,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "zUZGxFdUfm9D1s1p": {
              "_id": "zUZGxFdUfm9D1s1p",
              "type": "attack",
              "name": "Despedaçar Chamas",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 18,
                "units": "m"
              },
              "attack": {
                "ability": "",
                "bonus": "",
                "critical": {
                  "threshold": null
                },
                "type": {
                  "classification": "spell",
                  "value": "ranged"
                }
              },
              "damage": {
                "parts": [
                  {
                    "number": 4,
                    "denomination": 10,
                    "bonus": "",
                    "types": [
                      "fire"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Visão no Escuro",
        "type": "spell",
        "_id": "cxZLvtjVE7MLW5dd",
        "img": "icons/magic/perception/eye-ring-glow-yellow.webp",
        "system": {
          "description": {
            "value": "<p>Concede visão nas trevas por 8 horas.</p>",
            "chat": ""
          },
          "level": 2,
          "school": "trs",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "0mE0hyUUDoJJY2M2": {
              "_id": "0mE0hyUUDoJJY2M2",
              "type": "utility",
              "name": "Visão no Escuro",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "roll": {
                "name": "",
                "formula": "",
                "prompt": false,
                "visible": false
              }
            }
          }
        }
      },
      {
        "name": "Relâmpago",
        "type": "spell",
        "_id": "93bjsDwCE1gZr3lU",
        "img": "icons/magic/lightning/bolt-forked-blue.webp",
        "system": {
          "description": {
            "value": "<p>Traço crepitante de 30 metros rasgando o ar.</p>",
            "chat": ""
          },
          "level": 3,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "hPCjxTWmzz2PNwGX": {
              "_id": "hPCjxTWmzz2PNwGX",
              "type": "save",
              "name": "Relâmpago",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "dex",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 10,
                    "denomination": 6,
                    "bonus": "",
                    "types": [
                      "lightning"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Voo",
        "type": "spell",
        "_id": "7mYIIhsHxr5bm8VL",
        "img": "icons/magic/movement/wings-feathered-glowing-gold.webp",
        "system": {
          "description": {
            "value": "<p>Concede voo a 18 metros de deslocamento.</p>",
            "chat": ""
          },
          "level": 3,
          "school": "trs",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "VKZ44xUieqDNV583": {
              "_id": "VKZ44xUieqDNV583",
              "type": "utility",
              "name": "Voo",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "roll": {
                "name": "",
                "formula": "",
                "prompt": false,
                "visible": false
              }
            }
          }
        }
      },
      {
        "name": "Muralha de Fogo",
        "type": "spell",
        "_id": "Pi9Nq86y4hnflkri",
        "img": "icons/magic/fire/wall-fire-blaze-orange.webp",
        "system": {
          "description": {
            "value": "<p>Paredão maciço de fogo devorador.</p>",
            "chat": ""
          },
          "level": 4,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "z1qH9HwtbMLh9wfi": {
              "_id": "z1qH9HwtbMLh9wfi",
              "type": "save",
              "name": "Muralha de Fogo",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "dex",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 7,
                    "denomination": 8,
                    "bonus": "",
                    "types": [
                      "fire"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Imolação",
        "type": "spell",
        "_id": "Ahcr4PAVReCt5T17",
        "img": "icons/magic/fire/flame-burning-skeleton-red.webp",
        "system": {
          "description": {
            "value": "<p>Incendeia o corpo do alvo em chamas inextinguíveis.</p>",
            "chat": ""
          },
          "level": 5,
          "school": "evo",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "GbQtzw7kol1sTdCB": {
              "_id": "GbQtzw7kol1sTdCB",
              "type": "save",
              "name": "Imolação",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "dex",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 8,
                    "denomination": 6,
                    "bonus": "",
                    "types": [
                      "fire"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Desintegração",
        "type": "spell",
        "_id": "sSulkk9OmXkN8dK3",
        "img": "icons/magic/lightning/beam-laser-glow-green.webp",
        "system": {
          "description": {
            "value": "<p>Feixe esmeralda que reduz alvos a pó cinzento.</p>",
            "chat": ""
          },
          "level": 6,
          "school": "trs",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "k18wS0k8WbCRjjjk": {
              "_id": "k18wS0k8WbCRjjjk",
              "type": "save",
              "name": "Desintegração",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "dex",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 12,
                    "denomination": 46,
                    "bonus": "",
                    "types": [
                      "force"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Teletransporte",
        "type": "spell",
        "_id": "UwCdEvYqjK7jShY6",
        "img": "icons/magic/movement/portal-vortex-purple.webp",
        "system": {
          "description": {
            "value": "<p>Transporta o grupo inteiro para qualquer local do mesmo plano.</p>",
            "chat": ""
          },
          "level": 7,
          "school": "con",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "F9qmbkXSNiaRhpRQ": {
              "_id": "F9qmbkXSNiaRhpRQ",
              "type": "utility",
              "name": "Teletransporte",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "roll": {
                "name": "",
                "formula": "",
                "prompt": false,
                "visible": false
              }
            }
          }
        }
      },
      {
        "name": "Nuvem Incendiária",
        "type": "spell",
        "_id": "ShZs4PcQ7rGQxhdl",
        "img": "icons/magic/fire/cloud-flame-smoke-orange.webp",
        "system": {
          "description": {
            "value": "<p>Fumaça densa superaquecida com brasas incandescentes.</p>",
            "chat": ""
          },
          "level": 8,
          "school": "con",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "wHxrJac0g3C6xE1o": {
              "_id": "wHxrJac0g3C6xE1o",
              "type": "save",
              "name": "Nuvem Incendiária",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "save": {
                "ability": "dex",
                "dc": {
                  "calculation": "spellcasting",
                  "formula": ""
                }
              },
              "damage": {
                "onSave": "half",
                "parts": [
                  {
                    "number": 10,
                    "denomination": 8,
                    "bonus": "",
                    "types": [
                      "fire"
                    ],
                    "custom": {
                      "enabled": false,
                      "formula": ""
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        "name": "Parar o Tempo",
        "type": "spell",
        "_id": "AmlSaEn7tl3WMkvt",
        "img": "icons/magic/time/clock-hourglass-blue.webp",
        "system": {
          "description": {
            "value": "<p>Congela o fluxo do tempo para todos exceto o feiticeiro por 1d4+1 turnos.</p>",
            "chat": ""
          },
          "level": 9,
          "school": "trs",
          "preparation": {
            "mode": "prepared",
            "prepared": true
          },
          "properties": [
            "v",
            "s"
          ],
          "activities": {
            "3kbV8MAwsuiJJzKQ": {
              "_id": "3kbV8MAwsuiJJzKQ",
              "type": "utility",
              "name": "Parar o Tempo",
              "activation": {
                "type": "action",
                "value": 1,
                "condition": ""
              },
              "consumption": {
                "scaling": {
                  "allowed": false
                },
                "spellSlot": true,
                "targets": []
              },
              "target": {
                "prompt": true,
                "affects": {
                  "count": "1",
                  "type": "creature",
                  "choice": false,
                  "special": ""
                }
              },
              "range": {
                "value": 45,
                "units": "m"
              },
              "roll": {
                "name": "",
                "formula": "",
                "prompt": false,
                "visible": false
              }
            }
          }
        }
      }
    ],
    "effects": [],
    "folder": null,
    "ownership": {
      "default": 0
    },
    "flags": {
      "malha-arcana": {
        "corruption": 14
      }
    }
  }
];
