#!/bin/bash

mkdir -p src/styles/components

declare -A components

components["Header.css"]="
.header {
  background-color: #1e3a8a;
  color: white;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.header-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
"

components["UploadSection.css"]="
.upload-section {
  margin-bottom: 32px;
}
.upload-label {
  display: block;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 600;
}
.upload-input {
  padding: 8px;
  font-size: 14px;
}
"

components["ImagePreview.css"]="
.image-preview {
  margin-top: 16px;
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}
"

components["ResultSection.css"]="
.result-section {
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}
.result-title {
  font-size: 20px;
  font-weight: bold;
  color: #1e3a8a;
  margin-bottom: 12px;
}
.result-item {
  margin-bottom: 8px;
}
"

components["Footer.css"]="
.footer {
  background-color: #f0f0f0;
  text-align: center;
  padding: 16px;
  margin-top: auto;
  font-size: 14px;
  color: #555;
}
"

for file in "${!components[@]}"; do
  echo "${components[$file]}" > "src/styles/components/$file"
done

echo "✅ Regular CSS files created in src/styles/components/"
