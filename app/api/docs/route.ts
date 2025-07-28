import { NextResponse } from 'next/server';

export async function GET() {
  const swaggerSpec = {
    openapi: "3.0.0",
    info: {
      title: "Equipment Status Tracker API",
      description: "API for managing equipment status and tracking status history",
      version: "1.0.0",
      contact: {
        name: "API Support",
        email: "support@example.com"
      }
    },
    servers: [
      {
        url: "https://qa-assignment-omega.vercel.app",
        description: "Production server"
      },
      {
        url: "http://localhost:3000",
        description: "Development server"
      }
    ],
    paths: {
      "/api/equipment": {
        get: {
          summary: "Get all equipment",
          description: "Retrieve a list of all equipment with their current status",
          tags: ["Equipment"],
          responses: {
            "200": {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true
                      },
                      data: {
                        type: "array",
                        items: {
                          $ref: "#/components/schemas/Equipment"
                        }
                      },
                      count: {
                        type: "integer",
                        example: 5
                      }
                    }
                  }
                }
              }
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        },
        post: {
          summary: "Create new equipment",
          description: "Create a new equipment entry",
          tags: ["Equipment"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "status", "location"],
                  properties: {
                    name: {
                      type: "string",
                      description: "Equipment name",
                      example: "Excavator CAT 320"
                    },
                    status: {
                      type: "string",
                      enum: ["Active", "Idle", "Under Maintenance"],
                      description: "Equipment status",
                      example: "Active"
                    },
                    location: {
                      type: "string",
                      description: "Equipment location",
                      example: "Site A"
                    }
                  }
                }
              }
            }
          },
          responses: {
            "201": {
              description: "Equipment created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true
                      },
                      data: {
                        $ref: "#/components/schemas/Equipment"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              description: "Bad request - validation error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/api/equipment/{id}/status": {
        post: {
          summary: "Update equipment status",
          description: "Update the status of a specific equipment and record the change in history",
          tags: ["Equipment Status"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Equipment ID",
              schema: {
                type: "integer",
                example: 1
              }
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["status"],
                  properties: {
                    status: {
                      type: "string",
                      enum: ["Active", "Idle", "Under Maintenance"],
                      description: "New equipment status",
                      example: "Idle"
                    },
                    changedBy: {
                      type: "string",
                      description: "Name of person making the change",
                      example: "Operator John"
                    }
                  }
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Status updated successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true
                      },
                      data: {
                        type: "object",
                        properties: {
                          equipment: {
                            $ref: "#/components/schemas/Equipment"
                          },
                          historyEntry: {
                            $ref: "#/components/schemas/StatusHistory"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              description: "Bad request - validation error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error"
                  }
                }
              }
            },
            "404": {
              description: "Equipment not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error"
                  }
                }
              }
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
      "/api/equipment/{id}/history": {
        get: {
          summary: "Get equipment status history",
          description: "Retrieve the status change history for a specific equipment",
          tags: ["Equipment History"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Equipment ID",
              schema: {
                type: "integer",
                example: 1
              }
            },
            {
              name: "limit",
              in: "query",
              description: "Number of history entries to return",
              schema: {
                type: "integer",
                default: 10,
                example: 5
              }
            },
            {
              name: "offset",
              in: "query",
              description: "Number of history entries to skip",
              schema: {
                type: "integer",
                default: 0,
                example: 0
              }
            }
          ],
          responses: {
            "200": {
              description: "History retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        example: true
                      },
                      data: {
                        type: "object",
                        properties: {
                          equipmentId: {
                            type: "integer",
                            example: 1
                          },
                          history: {
                            type: "array",
                            items: {
                              $ref: "#/components/schemas/StatusHistory"
                            }
                          },
                          total: {
                            type: "integer",
                            example: 3
                          },
                          limit: {
                            type: "integer",
                            example: 10
                          },
                          offset: {
                            type: "integer",
                            example: 0
                          },
                          hasMore: {
                            type: "boolean",
                            example: false
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error"
                  }
                }
              }
            }
          }
        }
      },
    },
    components: {
      schemas: {
        Equipment: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Unique equipment identifier",
              example: 1
            },
            name: {
              type: "string",
              description: "Equipment name",
              example: "Excavator CAT 320"
            },
            status: {
              type: "string",
              enum: ["Active", "Idle", "Under Maintenance"],
              description: "Current equipment status",
              example: "Active"
            },
            location: {
              type: "string",
              description: "Equipment location",
              example: "Site A"
            },
            lastUpdated: {
              type: "string",
              format: "date-time",
              description: "Timestamp of last status update",
              example: "2024-01-15T10:30:00Z"
            }
          },
          required: ["id", "name", "status", "location", "lastUpdated"]
        },
        StatusHistory: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Unique history entry identifier",
              example: 1
            },
            equipmentId: {
              type: "integer",
              description: "Equipment ID",
              example: 1
            },
            previousStatus: {
              type: "string",
              description: "Previous equipment status",
              example: "Idle"
            },
            newStatus: {
              type: "string",
              description: "New equipment status",
              example: "Active"
            },
            timestamp: {
              type: "string",
              format: "date-time",
              description: "Timestamp of status change",
              example: "2024-01-15T10:30:00Z"
            },
            changedBy: {
              type: "string",
              description: "Name of person who made the change",
              example: "Operator John"
            }
          },
          required: ["id", "equipmentId", "previousStatus", "newStatus", "timestamp", "changedBy"]
        },
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false
            },
            error: {
              type: "string",
              description: "Error message",
              example: "Failed to fetch equipment"
            }
          },
          required: ["success", "error"]
        }
      }
    },
    tags: [
      {
        name: "Equipment",
        description: "Equipment management operations"
      },
      {
        name: "Equipment Status",
        description: "Equipment status update operations"
      },
      {
        name: "Equipment History",
        description: "Equipment status history operations"
      },
      {
        name: "System",
        description: "System management operations"
      }
    ]
  };

  return NextResponse.json(swaggerSpec);
} 