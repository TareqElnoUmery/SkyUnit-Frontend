# قاعدة بيانات مشاريع SkyUnit العقارية الشاملة

## فهرس المينو

1. [projects_database.dart - الكود الكامل](#projects_databasedart---الكود-الكامل)
2. [قائمة المشاريع](#قائمة-المشاريع)
3. [تنفيذ الكود](#تنفيذ-الكود)

---

## projects_database.dart - الكود الكامل

```dart
// lib/data/projects_database.dart
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import '../models/project.dart';

class ProjectsDatabase {
  static final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  // تهيئة قاعدة البيانات بجميع المشاريع
  static Future<void> initializeProjectsDatabase() async {
    final projects = getAllProjects();
    
    for (var project in projects) {
      await _firestore
          .collection('projects')
          .doc(project.projectId)
          .set(project.toMap(), SetOptions(merge: true));
    }
  }

  static List<Project> getAllProjects() {
    return [
      // ===== مشاريع سكن مصر =====
      Project(
        projectId: 'sakan_misr_new_cairo',
        projectName: 'Sakan Misr',
        arabieName: 'مشروع سكن مصر - القاهرة الجديدة',
        description: 'مشروع سكن مصر بالقاهرة الجديدة - الحي الثامن',
        category: 'sakan_misr',
        city: 'القاهرة الجديدة',
        location: 'الحي الثامن',
        latitude: 30.0131,
        longitude: 31.4989,
        priceFrom: 350000,
        priceTo: 850000,
        unitTypes: ['شقة 2 غرفة', 'شقة 3 غرف'],
        features: {
          'جيم': true,
          'مسبح': true,
          'حديقة': true,
          'أمن 24/7': true,
        },
        developer: 'وزارة الإسكان',
        isAvailable: true,
        rating: 4.5,
        themeColor: const Color(0xFF2563EB),
      ),
    ];
  }
}
```

---

## قائمة المشاريع

### 1. مشاريع سكن مصر
- سكن مصر - القاهرة الجديدة
- دار مصر - القاهرة الجديدة
- بيت في مصر - القاهرة الجديدة

### 2. مشاريع العاصمة الإدارية الجديدة
- ممشى المجاورة (D2)

### 3. مشاريع مصر للتعمير
- أبراج ماسبيرو - وسط البلد

---
