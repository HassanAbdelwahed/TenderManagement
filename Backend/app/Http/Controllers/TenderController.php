<?php

namespace App\Http\Controllers;

use App\Models\Tender;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TenderController extends Controller
{


     public function store(Request $request)
     {
         try {
            $validator = Validator::make($request->all(), [
                'tender_reference' => 'required|string',
                'customer_name' => 'required|string',
                'description' => 'required|string',
                'issue_date' => 'required|date',
                'closing_date' => 'required|date|after:issue_date'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 400);
            }

             $tender = Tender::create($request->all());

             return response()->json([
                 'status' => 'success',
                 'message' => 'Tender created successfully',
                 'data' => $tender,
             ], 201);

         } catch (\Exception $e) {
             return response()->json([
                 'status' => 'error',
                 'message' => 'Failed to create tender',
                 'error' => $e->getMessage(),
             ], 500);
         }
     }


     public function index()
     {
         try {

             $tenders = Tender::orderBy('created_at', 'desc')->get();
             return response()->json([
                 'status' => 'success',
                 'message' => 'Tenders retrieved successfully',
                 'data' => $tenders,
             ], 200);

         } catch (\Exception $e) {
             return response()->json([
                 'status' => 'error',
                 'message' => 'Failed to retrieve tenders',
                 'error' => $e->getMessage(),
             ], 500);
         }
     }


     public function show(int $id)
     {
         try {
             $tender = Tender::find($id);

             if (!$tender) {
                 return response()->json([
                     'status' => 'error',
                     'message' => 'Tender not found',
                 ], 404);
             }

             return response()->json([
                 'status' => 'success',
                 'message' => 'Tender details retrieved successfully',
                 'data' => $tender,
             ], 200);

         } catch (\Exception $e) {
             return response()->json([
                 'status' => 'error',
                 'message' => 'Failed to retrieve tender details',
                 'error' => $e->getMessage(),
             ], 500);
         }
     }
}
