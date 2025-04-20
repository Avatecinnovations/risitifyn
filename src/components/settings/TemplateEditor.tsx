import { useState } from "react";
import { TEMPLATES, TemplateStyle } from "@/types/invoiceTemplates";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColorPicker } from "@/components/ui/color-picker";
import { useNavigate } from "react-router-dom";

const TemplateEditor = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateStyle | null>(null);
  const [customStyles, setCustomStyles] = useState<
    TemplateStyle["styles"] | null
  >(null);

  const handleTemplateSelect = (template: TemplateStyle) => {
    setSelectedTemplate(template);
    setCustomStyles(template.styles);
  };

  const handleStyleChange = (
    section: keyof TemplateStyle["styles"],
    property: string,
    value: string
  ) => {
    if (!customStyles) return;

    setCustomStyles({
      ...customStyles,
      [section]: {
        ...customStyles[section],
        [property]: value,
      },
    });
  };

  const handleSave = () => {
    // TODO: Save custom template to database
    navigate("/settings");
  };

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Template Editor</h1>
        <div className="space-x-4">
          <Button variant="outline" onClick={() => navigate("/settings")}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Template</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Available Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {TEMPLATES.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all ${
                    selectedTemplate?.id === template.id
                      ? "ring-2 ring-primary"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-sm"
                        style={{
                          backgroundColor:
                            template.styles.header.backgroundColor,
                          border: `1px solid ${template.styles.header.borderColor}`,
                        }}
                      />
                      <span>{template.name}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {template.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedTemplate && customStyles && (
            <Card>
              <CardHeader>
                <CardTitle>
                  Customize {selectedTemplate.name} Template
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Header Styles</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Background Color</Label>
                      <ColorPicker
                        value={customStyles.header.backgroundColor}
                        onChange={(value) =>
                          handleStyleChange("header", "backgroundColor", value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Text Color</Label>
                      <ColorPicker
                        value={customStyles.header.textColor}
                        onChange={(value) =>
                          handleStyleChange("header", "textColor", value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Table Styles</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Header Background</Label>
                      <ColorPicker
                        value={customStyles.table.headerBackground}
                        onChange={(value) =>
                          handleStyleChange("table", "headerBackground", value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Header Text Color</Label>
                      <ColorPicker
                        value={customStyles.table.headerTextColor}
                        onChange={(value) =>
                          handleStyleChange("table", "headerTextColor", value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Summary Styles</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Background Color</Label>
                      <ColorPicker
                        value={customStyles.summary.backgroundColor}
                        onChange={(value) =>
                          handleStyleChange("summary", "backgroundColor", value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Text Color</Label>
                      <ColorPicker
                        value={customStyles.summary.textColor}
                        onChange={(value) =>
                          handleStyleChange("summary", "textColor", value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;
